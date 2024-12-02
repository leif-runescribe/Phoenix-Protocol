// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    IERC20 public stakingToken;   //  MockUSDe
    IERC20 public rewardToken;    //  MockSUSDe
    
    uint256 public rewardRatePerMinute = 1; // 1% per minute
    uint256 public constant SECONDS_IN_MINUTE = 60;
    uint256 public constant DECIMALS = 18;  // both tokens have 18 decimals

    struct Stake {
        uint256 amount;       // 
        uint256 startTime;    // timestamp 
    }

    mapping(address => Stake) public stakes;

    constructor(address _stakingToken, address _rewardToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    // Stake function
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");

        //stake
        stakingToken.transferFrom(msg.sender, address(this), amount);

        Stake storage userStake = stakes[msg.sender];

        if (userStake.amount > 0) {
            uint256 pendingRewards = calculateReward(msg.sender);
            userStake.amount += pendingRewards; // add pending rewards to staked amount
        }

        userStake.amount += amount;  // add the new stake
        userStake.startTime = block.timestamp;  // set the start time for rewards calculation
    }

    // calculate the reward 
    function calculateReward(address user) public view returns (uint256) {
        Stake storage userStake = stakes[user];
        if (userStake.amount == 0) {
            return 0;
        }

        uint256 stakedDurationInMinutes = (block.timestamp - userStake.startTime) / SECONDS_IN_MINUTE;
        uint256 reward = (userStake.amount * rewardRatePerMinute * stakedDurationInMinutes) 
                         / (100 * (10**DECIMALS));  
        return reward;
    }

    // Withdraw function
    function withdraw() external {
        Stake storage userStake = stakes[msg.sender];
        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = userStake.amount + reward;

        require(totalAmount > 0, "Nothing to withdraw");

        // reset the stake and start time
        userStake.amount = 0;
        userStake.startTime = 0;

        // transfer staked MockUSDe and rewards (MockSUSDe)
        stakingToken.transfer(msg.sender, userStake.amount); 
        rewardToken.transfer(msg.sender, reward); 
    }

    // reward rate
    function setRewardRate(uint256 rate) external onlyOwner {
        rewardRatePerMinute = rate;
    }
}
