//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract YourContract {

	enum Status {
		Pending,
		Accepted,
		Rejected
	}

	struct Person {
		string name;
		uint256 balance;
		address personAddress;
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

	struct Group {
		string name;
		address creator;
		address key;
		uint256 balance;
	}

	// use Group.key to get the array of people
	mapping(address => Person[]) public peopleMapping;
	// use Group.key to get the array of tasks
	mapping(address => Task[]) public taskMapping;

	Group[] public groups;

	//********************************
	// Group Related Functions
	//********************************

	function createGroup(string memory groupName, address creator) public {
		Group memory newGroup;
		newGroup.name = groupName;
		newGroup.creator = creator;
		newGroup.key = address(bytes20(keccak256(abi.encode(groupName))));
		groups.push(newGroup);
	}

	function deleteGroup(address key) public {
		uint256 indexToDelete;
		for (uint256 i = 0; i < groups.length; i++) {
			if (groups[i].key == key) {
				i = indexToDelete;
			}
		}
		require(indexToDelete < groups.length, "index out of bounds");
		for (uint256 i = indexToDelete; i < groups.length - 1; i++) {
			groups[i] = groups[i + 1];
		}
		groups.pop();
	}

	function joinGroup(address key) public {
		bool inGroup = false;
		Person[] memory peopleInGroup;
		peopleInGroup = peopleMapping[key];
		for (uint256 i = 0; i < peopleInGroup.length; i++) {
			if (peopleInGroup[i].personAddress == msg.sender) {
				inGroup = true;
			}
		}
		require(inGroup, "You are not invited");
	}

	function getGroups() public view returns (Group[] memory) {
		return groups;
	}

	function getSomeonesGroups(address inviteesAddress) public returns (Group[] memory) {
		Group[] memory personsGroups;
		for (uint256 i = 0; i < groups.length; i++) {
			address currentGroupKey = groups[i].key;
			Person[] memory currentGroupPeople = peopleMapping[currentGroupKey];
			for (uint256 j = 0; j < currentGroupPeople.length; j++) {
				if (currentGroupPeople[j].personAddress == inviteesAddress) {
					personsGroups = addGroup(personsGroups, groups[i]);
				}
			}
		}
		return personsGroups;
	}

	function addGroup(Group[] memory arr, Group memory newGroup) internal pure returns (Group[] memory) {
    Group[] memory newArr = new Group[](arr.length + 1);
    for (uint256 i = 0; i < arr.length; i++) {
        newArr[i] = arr[i];
    }
    newArr[arr.length] = newGroup;
    return newArr;
}

	//********************************
	// People Related Functions
	//********************************

	function addPerson(string memory name,
					   address personAddress,
					   address groupAddress
	) public {
		Person memory newPerson;
		newPerson.name = name;
		newPerson.personAddress = personAddress;
		peopleMapping[groupAddress].push(newPerson);
	}

	function getPeople(address key) public view returns (Person[] memory) {
		return peopleMapping[key];
	}

	function nextPersonsTurn(
		address key,
		string[] memory taskParticipants,
		string memory taskName
	) public {
		Task[] memory tasks = taskMapping[key];
		Task memory currentTask;
		for (uint256 i = 0; i < tasks.length; i++) {
			if (keccak256(abi.encode(tasks[i].name)) == keccak256(abi.encode(taskName))) {
				currentTask = tasks[i];
			}
		}
		uint256 numOfParticipants = currentTask.taskParticipants.length;
		uint256 counter = 0;
		currentTask.personsTurn = counter;
		if (currentTask.personsTurn < numOfParticipants) {
			counter++;
		} else {
			counter = 0;
		}
	}

	//********************************
	// Task Related Functions
	//********************************

	function createTask(
		string memory taskName,
		string memory taskDescription,
		address groupAddress,
		string[] memory taskParticipants
	) public {
		Task memory newTask;
		newTask.name = taskName;
		newTask.description = taskDescription;
		newTask.taskParticipants = taskParticipants;
		newTask.taskStatus = Status.Pending;
		taskMapping[groupAddress].push(newTask);
	}

	function getTasks(address key) public view returns (Task[] memory) {
		return taskMapping[key];
	}

	event VoteCounts(uint256 upVote, uint256 downVote);

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
