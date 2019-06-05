const jsonWebToken = require('jsonwebtoken');
const conf = require('../../conf');

const signOptions = {
    expiresIn: '7 days',
    issuer: 'Safarayaneh Communication',
    subject: 'Authorization key',
    audience: 'http://www.safarayaneh.com',
    algorithm: conf.auth.algorithm,
};

function sign(payload) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.sign(payload, conf.auth.privateKey, signOptions, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    })
}

// Just for test purposes
const verifyOptions = {...signOptions, algorithms: conf.auth.verifyOptions.algorithms};

function verify(token) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.verify(token, conf.auth.publicKey, verifyOptions, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    sign,
    verify,
};
