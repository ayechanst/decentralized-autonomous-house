//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "TaskNFT.sol"

contract YourContract {

	struct Person {
		string name;
		address personAddress;
		uint256 balance;
		uint256 reputation;
	}

	mapping(address => Person[]) public peopleMapping;
	Task[] public taskVotingQue;
	uint256 treasury;

}
