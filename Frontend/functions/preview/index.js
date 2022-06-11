const {initializeApp} = require('firebase/app');
const config = require('./config.json');
const {getStorage, ref, listAll} = require('firebase/storage');
const cachedUrls = require('./urlCache');

const headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'Content-Type',
    'access-control-allow-methods': 'GET'
  };

function getRandomInteger(min, max) {
    return Math.random() * (max - min) + min;
}
exports.handler = async (event, context, callback) => {
    let noCache = false;
    let items = [];
    let size = 6;
    if (event.queryStringParameters) {
        const params = event.queryStringParameters;
        noCache = !!params.noCache
    }
    
    if (noCache) {
        const app = initializeApp(config);
        // REDACTED
        const storage = getStorage(app, "REDACTED");

        const storageRef = ref(storage);
        const response = await listAll(storageRef);
        items = response.items.map((item, index) => ({
            url: `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}`,
            id: index
        }));
        console.log('using no cache')
        
    } else {
        items = cachedUrls;
        console.log('using cache')
    }

    let startInterval = getRandomInteger(0, items.length);
    let result = items;
    if (startInterval + size >= items.length) {
        result = [...items.slice(startInterval), ...items.slice(0, (size + startInterval) % items.length)];
    } else {
        result = [...items.slice(startInterval, startInterval + size)]
    }
    
    
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
    };
}

