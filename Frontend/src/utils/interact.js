require('dotenv').config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
// const etherscanKey = process.env.ETHERSCAN_API_KEY;

const contractABI = require("../contracts/GenesisVoxmon.sol/Genesis_Voxmon.json").abi;
const contractAddress = "0xc68f4101c936851E2FC89D2d303427Ce203c711a";  // todo change this to our own contract address


  export const getMaxTotal = async () => {
    let contract = await new web3.eth.Contract(contractABI, contractAddress);
    let result = await contract.methods.MAX_SUPPLY().call();
    return result;
  }

  export const getTotalMinted = async () => {
    let contract = await new web3.eth.Contract(contractABI, contractAddress);
    let result = await contract.methods.getTotalMinted().call();
    return result;
  }

  export const getRemainingPreReleaseMintsForAddress = async (address) => {
    if (address == null) {
      return 0;
    }
    let contract = await new web3.eth.Contract(contractABI, contractAddress);
    let result = await contract.methods.getRemainingPreReleaseMintsForAddress(address).call();
    return result;
  }

  export const getMintCost = async() => {
    let contract = await new web3.eth.Contract(contractABI, contractAddress);
    let result = await contract.methods.MINT_COST().call();
    return web3.utils.fromWei(result);
  }

  export const getNFTs = async(address) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://eth-ropsten.g.alchemy.com/${alchemyKey}/v1/getNFTs/?owner=${address}&${contractAddress}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // export const getVoxmonTokens = async (wallet) => {
  //   const options = {method: 'GET'};

  //   const result = await fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&owner=${wallet}&order_direction=desc&offset=0&limit=20`, options)
  //   .then(response => response.json())
  //     .catch(err => console.error(err));
  //     debugger;
  //   return result;
  // }
  
  export const mintNFT = async (numberToMint) => {
  
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);
    
    const cost = (await window.contract.methods.MINT_COST().call()) || '70000000000000000';

    const gasLimit = 39000 + (52000 * numberToMint)

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      gas: gasLimit.toString(16),
      value: web3.utils.toHex(cost.toString()),
      data: window.contract.methods
        .mint(window.ethereum.selectedAddress)
        .encodeABI(),
    };
  
    try {
      // eslint-disable-next-line no-unused-vars
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("sent txn");
      console.log(txHash);
      return txHash;
    } catch (error) {
      return null;
    }
  };

  export const getTxReceipt = async(tx) => {
    const txReceipt = await web3.eth.getTransactionReceipt(tx);
    // const txn = await web3.eth.getTransaction(tx);
    return txReceipt;
  }

  export const preReleaseMintNFT = async (numberToMint) => {
    
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);
    // const cost = (await window.contract.methods.MINT_COST().call()) || '70000000000000000';

    var gasLimit = (parseInt(numberToMint) * 110000);
    if (numberToMint === 5) {
      gasLimit = 320000;
    }

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      gas: gasLimit.toString(16),
      value: '0',
      data: window.contract.methods
        .preReleaseMint(window.ethereum.selectedAddress, numberToMint.toString())
        .encodeABI(),
    };
  
    try {
      // eslint-disable-next-line no-unused-vars
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return txHash;
    } catch (error) {
      return null;
    }
  };