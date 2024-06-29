const hre = require('hardhat');

async function main() {
  // Compile the contract if not compiled
  await hre.run('compile');

  // Get the contract factory
  const Count = await hre.ethers.getContractFactory("Count");

  // Deploy the contract with initial parameters (no parameters in this case)
  const count = await Count.deploy();

  // Wait for the deployment to complete
  await count.deployed();

  // Print the deployed contract address
  console.log(`Count contract deployed to: ${count.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
