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
		uint256 key;
		uint256 balance;
	}

	// use Group.key to get the array of people
	mapping(uint256 => Person[]) peopleMapping;
	// use Group.key to get the array of tasks
	mapping(uint256 => Task[]) taskMapping;

	Group[] public groups;

	function createGroup(string memory name) public {
		Group memory newGroup;
		newGroup.name = name;
		groups.push(newGroup);
	}

	// function addPerson(string memory name) public {}







}
