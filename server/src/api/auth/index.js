const validate = require('./validate');

module.exports = async function (server, options) {

    // Validate and generate token
    server.route({
        method: 'POST',
        path: 'users/auth',
        handler: validate,
        options: {auth: false}
    })
};