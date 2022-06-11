const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
// This comes from EIP721:
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md#specification

// const metaDataSchema = {
//     "title": "Asset Metadata",
//     "type": "object",
//     "properties": {
//         "name": {
//             "type": "string",
//             "description": "Identifies the asset to which this NFT represents"
//         },
//         "description": {
//             "type": "string",
//             "description": "Describes the asset to which this NFT represents"
//         },
//         "image": {
//             "type": "string",
//             "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
//         }
//     }
// }


// const getIPFSDirContent = (ipfsDirHash, numTokens) => {
//     let queryString = "?"
//     queryString = queryString + `hashContains=${ipfsDirHash}`;
//     const url = `https://api.pinata.cloud/data/pinList${queryString}`;
//     return axios
//         .get(url, {
//             headers: {
//                 pinata_api_key: process.env.PINATA_API_KEY,
//                 pinata_secret_api_key: process.env.PINATA_API_SECRET
//             }
//         })
//         .then(function (response) {
//             //handle response here
//             return response.data.rows;
//         })
//         .catch(function (error) {
//             //handle error here
//             console.log(error);
//         });
// }

const metaData = (tokenId, hash) => {
    return {
        name: `Voxmon #${tokenId}`,
        description: '',
        external_url: `https://voxmon.io/voxmon/token/${tokenId}`,
        attributes: {},
        image: `ipfs://${hash}/${tokenId}`
    }
}

const generateIPFSMetaData = (ipfsDirHash, imageDir, outDir) => {

    if (!fs.existsSync(outDir)){
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.readdirSync(imageDir).forEach((file) => {
        console.log(file);
        let fileName = file.split('.')[0];
        if (isNaN(parseInt(fileName))) {
            throw `Image File name must be a [number].xxx -- got ${filename}`;
        };
        let data =  metaData(fileName, ipfsDirHash);
        fs.writeFileSync( `${outDir}/${file}` ,JSON.stringify(data));
    });
}

module.exports = {
    generateMetaData
}