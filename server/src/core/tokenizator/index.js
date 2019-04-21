import fs from 'fs'
import jsonWebToken from 'jsonwebtoken'

export {
    sign,
    verify,
}

const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');
const publicKey = fs.readFileSync('./jwtRS256.key.pub', 'utf8');

const signOptions = {
    expiresIn: '7 days',
    issuer: 'Safarayaneh Communication',
    subject: 'Authorization key',
    audience: 'http://www.safarayaneh.com',
    algorithm: 'RS256'
};
const verifyOptions = {...signOptions, algorithm: ['RS256']};

function sign(payload) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.sign(payload, privateKey, signOptions, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    })
}

function verify(token) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.verify(token, publicKey, verifyOptions, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}
