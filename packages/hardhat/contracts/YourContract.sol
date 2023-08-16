//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
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
		address key;
		uint256 balance;
	}

	// use Group.key to get the array of people
	mapping(address => Person[]) public peopleMapping;
	// use Group.key to get the array of tasks
	mapping(address => Task[]) public taskMapping;

	Group[] public groups;

	function createGroup(string memory groupName) public {
		Group memory newGroup;
		newGroup.name = groupName;
		newGroup.key = address(bytes20(keccak256(abi.encode(groupName))));
		groups.push(newGroup);
	}

	function addPerson(string memory name, address groupAddress) public {
		Person memory newPerson;
		newPerson.name = name;
		peopleMapping[groupAddress].push(newPerson);
	}

	function createTask(string memory taskName, string memory taskDescription, address groupAddress) public {
		Task memory newTask;
		newTask.name = taskName;
		newTask.description = taskDescription;
		taskMapping[groupAddress].push(newTask);
	}









}
