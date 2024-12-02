// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./EmberToken.sol";

contract PhoenixVault is ERC721Enumerable, AccessControl {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Structs
    struct VaultInfo {
        address owner;
        address asset;
        uint256 depositAmount;
        uint256 emberBorrowed;
        uint256 lastInteractionTimestamp;
        bool isActive;
    }

    // Constants
    uint256 public constant MAX_LTV_RATIO = 75_00;   // 75% LTV
    uint256 public constant LIQUIDATION_THRESHOLD = 85_00;  // 85%
    uint256 public constant APY = 15_00;     // 15% APY
    uint256 public constant PRECISION = 10000;
    uint256 public constant TOKEN_DECIMALS = 10**18;
    // Mappings
    mapping(uint256 => VaultInfo) public vaultInfos;
    mapping(address => uint256[]) public userVaults;
    mapping(address => bool) public liquidators; // Track registered liquidators

    // Contract References
    IERC20 public susdToken;
    address public phoenixController;
    EmberToken public emberToken;

    // Events
    event VaultCreated(uint256 indexed vaultId, address indexed owner);
    event AssetDeposited(uint256 indexed vaultId, uint256 amount);
    event EmberBorrowed(uint256 indexed vaultId, uint256 amount);
    event AssetWithdrawn(uint256 indexed vaultId, uint256 amount);
    event VaultLiquidated(uint256 indexed vaultId, address liquidator);
    event LiquidatorAdded(address indexed liquidator);
    event LiquidatorRemoved(address indexed liquidator);

    // Constructor
    constructor(
        address _susdToken,
        address _phoenixController,
            address _emberToken

    ) ERC721("PhoenixVault", "PV") {
        susdToken = IERC20(_susdToken);
        phoenixController = _phoenixController;
        emberToken = EmberToken(_emberToken);
        // Grant the DEFAULT_ADMIN_ROLE to the contract deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Vault Creation
    function createVault() external returns (uint256) {
        uint256 newVaultId = totalSupply() + 1;
        _safeMint(msg.sender, newVaultId);

        vaultInfos[newVaultId] = VaultInfo({
            owner: msg.sender,
            asset: address(susdToken),
            depositAmount: 0,
            emberBorrowed: 0,
            lastInteractionTimestamp: block.timestamp,
            isActive: true
        });

        userVaults[msg.sender].push(newVaultId);

        emit VaultCreated(newVaultId, msg.sender);
        return newVaultId;
    }

    
    function depositAsset(uint256 vaultId, uint256 amount) external {
        _validateVaultOwner(vaultId);
        
        // Convert normal input to base units
        uint256 normalizedAmount = amount.mul(TOKEN_DECIMALS);
        
        susdToken.safeTransferFrom(msg.sender, address(this), normalizedAmount);
        
        VaultInfo storage vault = vaultInfos[vaultId];
        vault.depositAmount = vault.depositAmount.add(normalizedAmount);
        vault.lastInteractionTimestamp = block.timestamp;

        emit AssetDeposited(vaultId, amount);
    }

    // Borrow Capacity Calculation
    function calculateBorrowCapacity(uint256 vaultId) public view returns (uint256) {
        VaultInfo memory vault = vaultInfos[vaultId];
        
        // Convert deposit amount to base units and apply LTV
        uint256 baseDeposit = vault.depositAmount.mul(PRECISION);
        uint256 borrowCapacity = baseDeposit
            .mul(MAX_LTV_RATIO)
            .div(PRECISION)
            .div(TOKEN_DECIMALS);
        
        return borrowCapacity;
    }

    // Ember Borrowing
    function borrowEmber(uint256 vaultId, uint256 amount) external {
        _validateVaultOwner(vaultId);
        
        VaultInfo storage vault = vaultInfos[vaultId];
        uint256 maxBorrow = calculateBorrowCapacity(vaultId);
        
        // Convert amount to base units for comparison
        uint256 normalizedAmount = amount.mul(TOKEN_DECIMALS);
        
        require(vault.emberBorrowed.add(normalizedAmount) <= maxBorrow.mul(TOKEN_DECIMALS), "Exceeds borrow limit");
        require(emberToken.balanceOf(address(this)) >= normalizedAmount, "Insufficient Ember tokens in vault");

        vault.emberBorrowed = vault.emberBorrowed.add(normalizedAmount);
        vault.lastInteractionTimestamp = block.timestamp;

        emberToken.transfer(msg.sender, normalizedAmount);

        emit EmberBorrowed(vaultId, amount);
    }

    // Optional: Add function to seed or manage Ember tokens
    function seedEmberTokens(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emberToken.transferFrom(msg.sender, address(this), amount);
    }


    // Interest Calculation
    
    function calculateAccruedInterest(uint256 vaultId) public view returns (uint256) {
        VaultInfo memory vault = vaultInfos[vaultId];
        uint256 timePassed = block.timestamp.sub(vault.lastInteractionTimestamp);
        
        uint256 interest = vault.depositAmount
            .mul(APY)
            .mul(timePassed)
            .div(365 days)
            .div(PRECISION);
        
        // Convert interest to base units
        return interest.mul(TOKEN_DECIMALS);
    }

    // Repay and Settle
    function repayAndSettle(uint256 vaultId) external {
        _validateVaultOwner(vaultId);
        
        VaultInfo storage vault = vaultInfos[vaultId];
        uint256 accrued = calculateAccruedInterest(vaultId);
        
        if (accrued >= vault.emberBorrowed) {
            EmberToken(address(this)).burn(vault.emberBorrowed);
            vault.emberBorrowed = 0;
        } else {
            EmberToken(address(this)).burn(accrued);
            vault.emberBorrowed = vault.emberBorrowed.sub(accrued);
        }

        vault.lastInteractionTimestamp = block.timestamp;
    }

    // Liquidation Mechanism
    function liquidateVault(uint256 vaultId) external {
        require(isLiquidatable(vaultId), "Vault not liquidatable");
        require(liquidators[msg.sender], "Not authorized to liquidate");

        VaultInfo storage vault = vaultInfos[vaultId];

        uint256 totalCollateral = vault.depositAmount;
        uint256 borrowedAmount = vault.emberBorrowed;

        // Transfer collateral to liquidator
        susdToken.safeTransfer(msg.sender, totalCollateral);

        // Burn borrowed tokens
        EmberToken(address(this)).burn(borrowedAmount);

        // Reset vault
        vault.depositAmount = 0;
        vault.emberBorrowed = 0;
        vault.isActive = false;

        emit VaultLiquidated(vaultId, msg.sender);
    }

    // Liquidation Check
    function isLiquidatable(uint256 vaultId) public view returns (bool) {
        VaultInfo memory vault = vaultInfos[vaultId];
        uint256 currentBorrowPercentage = vault.emberBorrowed
            .mul(PRECISION)
            .div(vault.depositAmount);
        
        return currentBorrowPercentage >= LIQUIDATION_THRESHOLD;
    }
    

    // Add a liquidator (called by admin)
    function addLiquidator(address _liquidator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_liquidator != address(0), "Invalid address");
        require(!liquidators[_liquidator], "Already a liquidator");
        
        liquidators[_liquidator] = true;
        emit LiquidatorAdded(_liquidator);
    }

    // Remove a liquidator (called by admin)
    function removeLiquidator(address _liquidator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(liquidators[_liquidator], "Not a liquidator");

        liquidators[_liquidator] = false;
        emit LiquidatorRemoved(_liquidator);
    }

    // Validation Helpers
    function _validateVaultOwner(uint256 vaultId) internal view {
        require(ownerOf(vaultId) == msg.sender, "Not vault owner");
        require(vaultInfos[vaultId].isActive, "Vault is not active");
    }

    // User Vault Retrieval
    function getUserVaults(address user) external view returns (uint256[] memory) {
        return userVaults[user];
    }

    // override supportsInterface to fix conflict between ERC721Enumerable and AccessControl
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
