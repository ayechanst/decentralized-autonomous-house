//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract YourContract {
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
		bool init;
		string[] taskDoers;
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

	function addPerson(string memory name, address personAddress, address groupAddress) public {
		Person memory newPerson;
		newPerson.name = name;
		newPerson.personAddress = personAddress;
		peopleMapping[groupAddress].push(newPerson);
	}

	function getPeople(address key) public view returns (Person[] memory) {
		return peopleMapping[key];
	}

	function createTask(
		string memory taskName,
		string memory taskDescription,
		address groupAddress,
		string[] memory taskDoers
	) public {
		Task memory newTask;
		newTask.name = taskName;
		newTask.description = taskDescription;
		newTask.taskDoers = taskDoers;
		taskMapping[groupAddress].push(newTask);
	}

	function getTasks(address key) public view returns (Task[] memory) {
		return taskMapping[key];
	}

}
