const {pinDirectoryToIPFS} = require('./ipfsUploadDirectory');
const {generateIPFSMetaData} = require('./generateMetaData');
require('dotenv').config();


const IMAGE_DIR = './images'; // location of images to upload, file names should be enumerated
                      // i.e images/1.png, images/2.png
const PINNED_IMAGE_DIR_NAME = 'voxmon_img'; //name for pinned dir on pinata

const META_DATA_OUT_DIR = './metadata'; // out directory where metadata json files will be written
const PINNED_META_DATA_DIR_NAME = 'voxmon_metadata' //name for pinned dir on pinata;




const run = async () => {

    //upload image directory
    const result = await pinDirectoryToIPFS(
        process.env.PINATA_API_KEY,
        process.env.PINATA_API_SECRET,
        IMAGE_DIR,
        PINNED_IMAGE_DIR_NAME
    );
    
    console.log('image dir ipfs hash:', result.IpfsHash);

    //generate meta data pointing to images, written to local fs dir
    generateIPFSMetaData(result.IpfsHash, IMAGE_DIR, META_DATA_OUT_DIR);


    // upload metadata directory
    const {IpfsHash: metadataIpfsHash} = await pinDirectoryToIPFS(
        process.env.PINATA_API_KEY,
        process.env.PINATA_API_SECRET,
        META_DATA_OUT_DIR,
        PINNED_META_DATA_DIR_NAME
    )
    console.log("metadata ipfs hash:", metadataIpfsHash);
}   

run();