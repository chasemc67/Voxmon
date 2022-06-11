require('dotenv').config();
const Arweave = require('arweave');

const arweave = Arweave.init();

arweave.wallets.jwkToAddress(process.env.ARWEAVE_PRIVATE_KEY).then((address) => {
    console.log(`address: ${address}`);
    arweave.wallets.getBalance(address).then((balance) => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(winston);
        console.log(`Balance: ${ar}`);
    })
});