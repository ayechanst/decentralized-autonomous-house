const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YourContract", function () {
  let yourContract;

  beforeEach(async () => {
    const YourContract = await ethers.getContractFactory("YourContract");
    yourContract = await YourContract.deploy();
    await yourContract.deployed();
  });

  it("Should create a group", async function () {
    const randomWalletForPerson = ethers.Wallet.createRandom();
    const randomAddressForPerson = randomWalletForPerson.address;
    await yourContract.createGroup("TestGroup", randomAddressForPerson);
    const groups = await yourContract.getGroups();
    expect(groups.length).to.equal(1);
  });

  it("Should add a person to a group", async function () {
    const personWallet = ethers.Wallet.createRandom();
    const personAddress = personWallet.address;
    const groupWallet = ethers.Wallet.createRandom();
    const groupAddress = groupWallet.address;
    const groupName = "TestGroup";

    await yourContract.createGroup(groupName, groupAddress);
    const groupKey = yourContract.groups[0].key;
    console.log("groupKey: ", groupKey);
    await yourContract.addPerson("Alice", personAddress, groupKey);
    const people = await yourContract.getPeople(groupKey);
    expect(people.length).to.equal(1);
  });

  xit("Should create and vote on a task", async function () {
    await yourContract.createGroup("TestGroup", ethers.constants.AddressZero);
    const groupKey = await yourContract.groups(0).key;
    const taskParticipants = [ethers.constants.AddressZero];
    await yourContract.createTask("TestTask", "Task Description", groupKey, taskParticipants);
    await yourContract.vote(groupKey, "TestTask", 1);
    const tasks = await yourContract.getTasks(groupKey);
    const task = tasks[0];
    expect(task.upVote).to.equal(1);
    expect(task.taskStatus).to.equal(1); Status.Accepted
  });
});
