const admin = require('firebase-admin');
const accountConfig = require('./config.json');

admin.initializeApp({
    credential: admin.credential.cert(accountConfig)
})

const db = admin.firestore();

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'Content-Type',
  'access-control-allow-methods': 'GET, POST, PUT, OPTIONS, DELETE'
};

exports.handler = async (event, context, callback) => {
    // wait for the record to be added
    console.log('http', event.httpMethod);
    if (event.httpMethod === 'OPTIONS') {
      callback(null, {
        statusCode: 200,
        headers
      });
    }
    try {
      const body = JSON.parse(event.body);
      const {email} = body;
      await db.collection('interestedUsers').add({
        email,
        timestamp: Date.now()
      });
    
      // Return a callback witha 200 response and a message.
      return callback(null, {
        statusCode: 200,
        headers
      })
    } catch {
      return callback(null, {
        statusCode: 500,
        headers
      });
    }
  }
  
