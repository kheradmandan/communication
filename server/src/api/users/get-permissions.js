const getAllPermissions = require('../../services/permissions/get-all');

/**
 * Controller for [GET users/permissions] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'GET',
        path: 'users/permissions',
        handler,
        options: {
            validate
        }
    });
};

const validate = {};

const handler = async function (request) {
    const currentUser = request.auth.credentials;

    return getAllPermissions(currentUser._id);
};