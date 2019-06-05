const fs = require('fs');

const publicKey = process.env.PUBLIC_KEY || fs.readFileSync('./jwtRS256.key.pub', 'utf8');
const privateKey = process.env.PRIVATE_KEY || fs.readFileSync('./jwtRS256.key', 'utf8');

module.exports.auth = {
    privateKey,
    publicKey,
    algorithm: 'RS256',
    verifyOptions: {algorithms: ['RS256']}
};

module.exports.mongo = {
    url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/communication_dev'
};
