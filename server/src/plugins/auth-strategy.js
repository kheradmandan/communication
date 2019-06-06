const conf = require('../conf');

function strategy(server) {

    server.auth.strategy('jwt', 'jwt', {
        key: conf.auth.keys.publicKey,
        verifyOptions: conf.auth.verifyOptions.algorithms,
        validate,
    });

    server.auth.default('jwt');
}

// How token's user is valid
async function validate(decode, request, h) {
    return {isValid: true, credential: decode}
}

module.exports.plugin = {
    register: strategy,
    version: '1.0.0',
    name: 'auth-jwt-strategy',
};