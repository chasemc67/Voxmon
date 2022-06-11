require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/VoxmonNFT.sol/VoxmonNFT.json"); 
const contractAddress = "0xf4B6A98BcE5942B03978A9a10de6b07F4467EDF5";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    let nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI, 'vox').encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
            if (!err) {
                console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
              } else {
                console.log("Something went wrong when submitting your transaction:", err)
              }
            });
        }).catch((err) => {
            console.log(" Promise failed:", err);
    });
}

// Metadata uploaded to IPFS
// mintNFT("https://gateway.pinata.cloud/ipfs/QmXJyyroPNwUhTC7Rf7Y47WVNGEwmTUtMSMD98DJaJyCB1");

// Metadata uploaded to arweave
mintNFT("https://arweave.net/WRlFGpLNdXGvBY24xlWW5PJzvV-a9FFxxmnXnpPMe9Q")