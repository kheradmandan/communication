const fs = require('fs');

const isProductionMode = process.env.NODE_ENV === 'production';

const publicKey = process.env._COMMUNICATION_PUBLIC_KEY || fs.readFileSync('./jwtRS256.key.pub', 'utf8');
const privateKey = process.env._COMMUNICATION_PRIVATE_KEY || fs.readFileSync('./jwtRS256.key', 'utf8');

module.exports.auth = {
    keys: {
        privateKey,
        publicKey,
    },
    signOptions: {
        expiresIn: '7 days',
        issuer: 'Safarayaneh Communication',
        subject: 'Authorization key',
        audience: 'http://www.safarayaneh.com',
        algorithm: 'RS256',
    },
    verifyOptions: {
        algorithms: ['RS256']
    },
};

module.exports.mongo = {
    url: process.env._COMMUNICATION_CON,
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        autoIndex: !isProductionMode,
        useFindAndModify: false,
    }
};

module.exports.global = {
    isProductionMode
};