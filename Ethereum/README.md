Created from this [guide](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft)

Keys:
Create `.env` file (within this Ethereum Folder) with:
```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = ""
PUBLIC_KEY = ""
ARWEAVE_KEY = '{...}'
```

Deps:
`npm install`

Compile Solidity Contracts:
`npx hardhat compile`

Deploy Solidity Contracts:
`npx hardhat run scripts/deploy.js --network ropsten`

Verify Contract:
`npx hardhat verify --network ropsten <contract address>`

Arweave Key:
Generate an Arweave Key from the [faucet](https://faucet.arweave.net/) and then use JSON.stringify on the json blob. 

Currently Deployed to: --

After Deploying the contract, the contract Address needs to be updated in `Frontend/src/utils.interact.js` AND the contract abi needs to be copied into `Frontend/src/contracts/VoxmonNFT.sol`