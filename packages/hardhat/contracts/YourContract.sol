//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract YourContract {

	struct Task {
		string taskName;
		string taskDescription;
		uint256 taskWeight;
	}

	uint256 numOfMembers = 0;
	uint256 minVotes = numOfMembers / 2;
	mapping(address => bool) public isMember;
	Task[] taskVotingQue;

	modifier onlyMember() {
		require(isMember[msg.sender], "You are not a member of the DAO.");
		_;
	}

	function addMember(address newMember) external {
		require(!isMember[newMember], "Address is already a member of the DAO.");
		isMember[msg.sender] = true;
		numOfMembers++;
	}

	function suggestTask(
		string memory taskName,
		string memory taskDescription,
		uint256 taskWeight
	) public onlyMember {
		require(taskWeight < 11, "Task cannot weigh more than 10 units.");
		Task memory newTask = Task({
				taskName: taskName,
				taskDescription: taskDescription,
				taskWeight: taskWeight
			});
		taskVotingQue.push(newTask);
	}

	// TODO: Members can only vote once, make it so they cant vote twice
	function voteOnTask(uint256 vote) external onlyMember {
		address[] memory alreadyVoted = new address[](numOfMembers);
		// TODO: fix 47 and 49, no push method on memory
		alreadyVoted[alreadyVoted.length - 1] = msg.sender;
		for (uint256 i = 0; i < alreadyVoted.length; i++) {
			require(alreadyVoted[i] != msg.sender, "You already voted");
		}
		Task memory taskBeingVoted = taskVotingQue[taskVotingQue.length];
		if (vote > minVotes) {
			// call the mint function passing in taskBeingVoted
		}
	}

}
