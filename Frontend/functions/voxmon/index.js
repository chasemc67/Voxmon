// Used to store metadata on voxmon 

const {initializeApp} = require('firebase/app');
const config = require('./config.json');
const {collection, query, where, getFirestore, getDocs, limit } = require('firebase/firestore');


const headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'Content-Type',
    'access-control-allow-methods': 'GET'
};
const app = initializeApp(config);

exports.handler = async (event, context, callback) => {
    if (!event.queryStringParameters || !event.queryStringParameters.id) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: "id was not provided"
            })
        };
    }

    const id = event.queryStringParameters.id;
    
    initializeApp(config);
    const db = getFirestore()

    const voxmonTokensRef = collection(db, 'voxmonTokens');
    const readQuery = query(voxmonTokensRef, where('id', '==', id, limit(1)));
    try {
        let docs = await getDocs(readQuery);
        let results = []
        docs.forEach(doc => results.push(doc.data()));

        if (results.length === 1) {
            let payload = results[0];
            payload.imageUrl = `${payload.url}?alt=media`;
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(payload)
            }
        }
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'id is invalid or doesn\'t exist'
            })
        }
    } catch (err) {
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify(err)
        }
    }
}

