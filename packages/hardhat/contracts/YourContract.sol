//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "TaskNFT.sol"

contract YourContract {

	mapping(address => bool) public isMember;

	modifier onlyMember() {
		require(isMember[msg.sender], "You are not a member of the DAO.");
		_;
	}

}
