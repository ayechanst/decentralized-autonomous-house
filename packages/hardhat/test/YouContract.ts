import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let yourContract: YourContract;

beforeEach(async () => {
    const YourContract = await ethers.getContractFactory("YourContract");
    yourContract = await YourContract.deploy();
    await yourContract.deployed();
  });

  it("Should create a group", async function () {
    await yourContract.createGroup("TestGroup", ethers.constants.AddressZero);
    const groups = await yourContract.getGroups();
    expect(groups.length).to.equal(1);
  });

  it("Should add a person to a group", async function () {
    await yourContract.createGroup("TestGroup", ethers.constants.AddressZero);
    const groupKey = await yourContract.groups(0).key;
    await yourContract.addPerson("Alice", ethers.constants.AddressZero, groupKey);
    const people = await yourContract.getPeople(groupKey);
    expect(people.length).to.equal(1);
  });

  it("Should create and vote on a task", async function () {
    await yourContract.createGroup("TestGroup", ethers.constants.AddressZero);
    const groupKey = await yourContract.groups(0).key;
    const taskParticipants = [ethers.constants.AddressZero];
    await yourContract.createTask("TestTask", "Task Description", groupKey, taskParticipants);
    await yourContract.vote(groupKey, "TestTask", 1);
    const tasks = await yourContract.getTasks(groupKey);
    const task = tasks[0];
    expect(task.upVote).to.equal(1);
    expect(task.taskStatus).to.equal(1); // Status.Accepted
  });

});
