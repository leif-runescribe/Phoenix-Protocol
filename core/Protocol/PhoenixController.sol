// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./PhoenixVault.sol";
import "./EmberToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PhoenixController is AccessControl {
    using SafeMath for uint256;

    // Roles
    bytes32 public constant PROTOCOL_ADMIN_ROLE = keccak256("PROTOCOL_ADMIN_ROLE");
    bytes32 public constant RISK_MANAGER_ROLE = keccak256("RISK_MANAGER_ROLE");

    // Protocol Configurations
    struct ProtocolParameters {
        uint256 maxLTVRatio;
        uint256 liquidationThreshold;
        uint256 baseInterestRate;
    }

    // Contract References
    PhoenixVault public phoenixVault;
    EmberToken public emberToken;
    IERC20 public susdToken;

    // Protocol Parameters
    ProtocolParameters public protocolParams;

    // Emergency Stop
    bool public emergencyPaused;

    // Events
    event ProtocolParametersUpdated(
        uint256 maxLTVRatio, 
        uint256 liquidationThreshold, 
        uint256 baseInterestRate
    );
    event LiquidatorRegistered(address liquidator);
    event LiquidatorRemoved(address liquidator);
    event EmergencyPauseActivated();
    event EmergencyPauseDeactivated();

    // Constructor
    constructor(
        address _phoenixVault,
        address _emberToken,
        address _susdToken
    ) {
        phoenixVault = PhoenixVault(_phoenixVault);
        emberToken = EmberToken(_emberToken);
        susdToken = IERC20(_susdToken);

        // Initialize AccessControl
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);  // Granting admin role
        _grantRole(PROTOCOL_ADMIN_ROLE, msg.sender); // Granting protocol admin role
        _grantRole(RISK_MANAGER_ROLE, msg.sender);   // Granting risk manager role

        // Initial Protocol Parameters
        protocolParams = ProtocolParameters({
            maxLTVRatio: 75_00,
            liquidationThreshold: 85_00,
            baseInterestRate: 15_00
        });
    }

    // Protocol Parameter Management
    function updateProtocolParameters(
        uint256 _maxLTVRatio,
        uint256 _liquidationThreshold,
        uint256 _baseInterestRate
    ) external onlyRole(RISK_MANAGER_ROLE) {
        require(_maxLTVRatio > 0 && _maxLTVRatio <= 90_00, "Invalid LTV Ratio");
        require(_liquidationThreshold > _maxLTVRatio, "Invalid Liquidation Threshold");
        
        protocolParams.maxLTVRatio = _maxLTVRatio;
        protocolParams.liquidationThreshold = _liquidationThreshold;
        protocolParams.baseInterestRate = _baseInterestRate;

        emit ProtocolParametersUpdated(
            _maxLTVRatio, 
            _liquidationThreshold, 
            _baseInterestRate
        );
    }

    // Liquidator Management
    function registerLiquidator(address _liquidator) external onlyRole(PROTOCOL_ADMIN_ROLE) {
        phoenixVault.addLiquidator(_liquidator);
        emit LiquidatorRegistered(_liquidator);
    }

    function removeLiquidator(address _liquidator) external onlyRole(PROTOCOL_ADMIN_ROLE) {
        phoenixVault.removeLiquidator(_liquidator);
        emit LiquidatorRemoved(_liquidator);
    }

    // Global Protocol Health Check
    function checkProtocolHealth() external view returns (bool) {
        // Example: Implement health check logic to monitor protocol's total borrow value, collateral status, etc.
        // Return true if healthy, false if problematic
        uint256 totalBorrowed = phoenixVault.totalSupply(); // Just an example, you can improve this
        uint256 totalCollateral = susdToken.balanceOf(address(phoenixVault));
        
        // Simple check: If borrowed value exceeds collateral by a certain threshold, it's unhealthy
        return totalBorrowed < totalCollateral;
    }

    // Emergency Pause Mechanism
    function emergencyPause() external onlyRole(PROTOCOL_ADMIN_ROLE) {
        require(!emergencyPaused, "Already paused");
        emergencyPaused = true;

        // Implement any contract functions that need to be paused (e.g., vault operations, etc.)
        //phoenixVault.pause(); // Assuming PhoenixVault has a pause function

        emit EmergencyPauseActivated();
    }

    function emergencyResume() external onlyRole(PROTOCOL_ADMIN_ROLE) {
        require(emergencyPaused, "Not paused");
        emergencyPaused = false;

        // Resume paused functions
        //phoenixVault.unpause(); // Assuming PhoenixVault has an unpause function

        emit EmergencyPauseDeactivated();
    }
}
