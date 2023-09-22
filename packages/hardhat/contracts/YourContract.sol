//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "TaskNFT.sol"

contract YourContract {

	enum Status {
		Pending,
		Accepted,
		Rejected
	}

	struct Person {
		string name;
		address personAddress;
		uint256 balance;
		uint256 reputation;
	}

	struct Task {
		string name;
		string description;
		uint256 grade;
		Status taskStatus;
		string[] taskParticipants;
		uint256 personsTurn;
		uint256 upVote;
		uint256 downVote;
	}

	mapping(address => Person[]) public peopleMapping;
	mapping(address => Task[]) public taskMapping;
	Task[] public taskVotingQue;
	uint256 treasury;

	//********************************
	// Task Related Functions
	//********************************

	function suggestTask(
		string memory taskName,
		string memory taskDescription,
		string[] memory taskParticipants
	) public {
		Task memory newTask;
		newTask.name = taskName;
		newTask.description = taskDescription;
		newTask.taskParticipants = taskParticipants;
		newTask.taskStatus = Status.Pending;
		taskVotingQue.push(newTask);
	}

	function voteOnTask(address voter, uint256 vote) public {
		Task storage taskInQuestion = taskVotingQue[0];
	}

	function getTasks(address key) public view returns (Task[] memory) {
		return taskMapping[key];
	}

	event VoteCounts(uint256 upVote, uint256 downVote);

	// fix this, it should not be this complicated
	function vote(
		address key,
		string memory taskName,
		uint256 vote
  ) public {
		Task[] memory tasks = taskMapping[key];
		Task memory currentTask;
		for (uint256 i = 0; i < tasks.length; i++) {
			if (keccak256(abi.encode(tasks[i].name)) == keccak256(abi.encode(taskName))) {
				currentTask = tasks[i];
			}
		}
		if (vote == 2) {
			currentTask.downVote = currentTask.downVote + 1;
			console.log(currentTask.downVote);
		} else if (vote == 1) {
			currentTask.upVote = currentTask.upVote + 1;
			console.log(currentTask.upVote);
		} else {
			require(false, "not a good input");
		}
		emit VoteCounts(currentTask.downVote, currentTask.upVote);
		uint256 numOfParticipants = currentTask.taskParticipants.length;
		uint256 totalVotes = currentTask.downVote + currentTask.upVote;
		if (totalVotes == numOfParticipants) {
			if (currentTask.upVote > currentTask.downVote) {
				currentTask.taskStatus = Status.Accepted;
			} else {
				currentTask.taskStatus = Status.Rejected;
			}
		}
	}

}
