import pkg from 'hardhat';
const { deployments } = pkg;

async function getDeploymentAddress() {
  // deploy your contract
  const yourContract = await deployments.deploy("yourContract");

  // access the deployed contract's address
  const contractAddress = yourContract.address;

  console.log("Contract deployed at:", contractAddress);
}

getDeploymentAddress()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
