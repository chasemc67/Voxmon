//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');
require('dotenv').config();

const pinDirectoryToIPFS = (pinataApiKey, pinataSecretApiKey, dirToUpload, pinnedDirName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = dirToUpload;

    //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
    let promise = new Promise((resolve, reject) => {
        recursive.readdirr(src, function (err, dirs, files) {
            let data = new FormData();
            files.forEach((file) => {
                //for each file stream, we need to include the correct relative file path
                data.append(`file`, fs.createReadStream(file), {
                    filepath: basePathConverter(src, file)
                });
            });
    
            const metadata = JSON.stringify({
                name: pinnedDirName
            });
            data.append('pinataMetadata', metadata);
    
            return axios
                .post(url, data, {
                    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey
                    }
                })
                .then(function (response) {
                    //handle response here
                    console.log("success! IPFS HASH is:", response.data.IpfsHash);
                    console.log('files uploaded:', files.length);
                    resolve(response.data);
                })
                .catch(function (error) {
                    //handle error here
                    console.log(error)
                    reject(error);
                });
        });
    })

    return promise;
    
};

module.exports = {
    pinDirectoryToIPFS
}