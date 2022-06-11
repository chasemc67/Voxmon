Currently this code is just stolen from the [Alchemy Tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter)

Create a `.env` file within `Frontend/` (this folder) which contains Pinata and Alchemy api keys, and looks like:
```
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/
<alchemy-key>
ETHERSCAN_API_KEY = <etherscan-api-key>

REACT_APP_WALLET_ENABLED = <boolean>
```

running:
```
npm install
npm start
```