//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract YourContract {
	struct Person {
		string name;
		uint256 balance;
		uint256 reputation;
	}

	struct Task {
		string name;
		string description;
		uint256 grade;
		bool init;
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

	function getGroups() public view returns (Group[] memory) {
		return groups;
	}

	function addPerson(string memory name, address groupAddress) public {
		Person memory newPerson;
		newPerson.name = name;
		peopleMapping[groupAddress].push(newPerson);
	}

	function createTask(
		string memory taskName,
		string memory taskDescription,
		address groupAddress
	) public {
		Task memory newTask;
		newTask.name = taskName;
		newTask.description = taskDescription;
		taskMapping[groupAddress].push(newTask);
	}
}
