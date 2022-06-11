const { ethers } = require("hardhat");

async function main() {
    const VoxmonNFT = await ethers.getContractFactory("VoxmonNFT");

    // start deployment, returning a promise that resolves to a contract object
    const voxmonNFT = await VoxmonNFT.deploy("0x7c4D0a5FC1AeA24d2Bd0285Dd37a352b6795b78B");
    console.log("Contract deployed to address:", voxmonNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })