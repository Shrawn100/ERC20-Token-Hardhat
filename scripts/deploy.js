// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  //Deploy MyToken
  const MyToken = await ethers.getContractFactory("SHRAWN");
  const myToken = await MyToken.deploy();

  // Deploy TokenSale
  const TokenSale = await ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(myToken.address);

  // Transfer the total supply from MyToken to TokenSale
  const totalSupply = await myToken.totalSupply();
  await myToken.transfer(tokenSale.address, totalSupply);

  // Wait for the deployments to complete
  await myToken.deployed();
  await tokenSale.deployed();

  console.log(`MyToken deployed to: ${myToken.address}`);
  console.log(`TokenSale deployed to: ${tokenSale.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
