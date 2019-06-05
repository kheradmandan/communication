const auth = require('./auth');

module.exports = async function (server, options) {

    // Validate and generate token
    server.route({
        method: 'POST',
        path: 'users/auth',
        handler: auth.handler,
        options: {
            auth: false,
            validate: auth.validate,
        }
    })
};