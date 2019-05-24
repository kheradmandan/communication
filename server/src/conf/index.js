const conf = {};

const SECRET_KEY = process.env.SECRET_KEY || 'its-a-secret-key';
const ENCODING = process.env.ENCODING || 'utf8';

conf.auth = {
    secret: Buffer.from(SECRET_KEY, ENCODING),
    tokenType: 'Token',
    algorithm: 'HS256',
    verifyOptions: {algorithms: ['HS256']}
};


module.exports = conf;