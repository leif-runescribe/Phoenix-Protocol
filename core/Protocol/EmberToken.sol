// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EmberToken is ERC20, Ownable(msg.sender) {
    constructor() ERC20("Ember", "EMBR") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** uint256(decimals()));
    }

    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount * 10 ** uint256(decimals()));
    }
}