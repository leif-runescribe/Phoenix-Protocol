// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockSUSDe is ERC20 {
    constructor(uint256 initialSupply) ERC20("Mock SUSDe", "sUSDe") {
        _mint(msg.sender, initialSupply * 10 ** uint256(decimals()));
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
