// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TaskNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("TaskNFT", "TSK") {}

    struct Task {
        string taskName;
        string taskDescription;
        uint256 taskWeight;
    }

    mapping(uint256 => Task) public metadata;

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function addTask(
        uint256 tokenID,
        string memory taskName,
        string memory taskDescription,
        uint256 taskWeight
    ) public onlyOwner {
        Task memory newTask = Task({
            taskName: taskName,
            taskDescription: taskDescription,
            taskWeight: taskWeight
           });
       metadata[tokenID] = newTask;
    }

}
