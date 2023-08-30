import { ethers } from "hardhat";

async function countVotes() {
  const YourContract = await ethers.getContractFactory("YourContract");
  const yourContract = await YourContract.attach("YOUR_CONTRACT_ADDRESS");

  // Listen for the VoteCounts event
  yourContract.on("VoteCounts", (upVotes, downVotes, event) => {
    console.log("Up Votes:", upVotes.toString());
    console.log("Down Votes:", downVotes.toString());
  });
}

countVotes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
