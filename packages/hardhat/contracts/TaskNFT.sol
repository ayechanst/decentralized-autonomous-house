pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TaskNFT is ERC721 {
    constructor() ERC721("TaskNFT", "TSK") {
    }
}
