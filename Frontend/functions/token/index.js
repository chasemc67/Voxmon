const admin = require('firebase-admin');
const accountConfig = require('./config.json');

const alchemyKey = "REDACTED"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../../src/contracts/GenesisVoxmon.sol/Genesis_Voxmon.json").abi
const contractAddress = "REDACTED";

admin.initializeApp({
    credential: admin.credential.cert(accountConfig)
})
const db = admin.firestore();


const headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'Content-Type',
    'access-control-allow-methods': 'GET'
};

exports.handler = async (event, context, callback) => {
    let pathParts = event.path.split('/');

    if (pathParts.indexOf('token') + 1 >= pathParts.length) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: `id must be specified /token/<tokenId>`
            })
        }
    } 

    let id = pathParts[pathParts.indexOf('token') + 1]
    if (isNaN(parseInt(id))) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: `invalid id`
            })
        }
    }


    let tokenId = parseInt(id);

    if (tokenId < 1) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: `id must be greater than 0 `
            })
        }
    }

    let contract = await new web3.eth.Contract(contractABI, contractAddress);
    try {
        // if token id doesn't have an owner this will throw
        let totalTokens = parseInt(await contract.methods.getTotalTokenURIs().call());
        console.log('total tokens', totalTokens)
        if (totalTokens < tokenId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: `metadata for id ${tokenId} is not available`
                })
            }
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: `something went wrong`
            })
        }
    }

    const metaDataRef = await db.collection('voxmonMetadata').doc(`${tokenId}`).get();
    const metaData = metaDataRef.data()
    if (!metaData) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: `metadata for id ${tokenId} doesn't exist`
            })
        }
    }

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(
            metaData
        )
    }
}