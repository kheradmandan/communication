const jsonWebToken = require('jsonwebtoken');
const {auth} = require('../../conf');

/**
 * Sign payload and generate jwt token
 * @param payload
 * @returns {Promise<any>}
 */

function sign(payload) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.sign(payload, auth.keys.privateKey, auth.signOptions, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    })
}

/**
 * Verify token
 * @param token
 * @returns {Promise<any>}
 */
function verify(token) {
    return new Promise(function (resolve, reject) {
        jsonWebToken.verify(token, auth.keys.publicKey, auth.verifyOptions, function (err, data) {
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
