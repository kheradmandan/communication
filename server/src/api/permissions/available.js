const permissionService = require('../../services/permissions/available');

/**
 * Controller for [GET permissions/era/available] route.
 * @param server
 * @returns {Promise<void>}
 */

module.exports = async function (server) {
    server.route({
        method: 'GET',
        path: 'permissions/eras/available',
        handler,
        options: {
            validate
        }
    });
};

const validate = {};

const handler = async function (request) {
    const userId = request.auth.credentials._id;
    return permissionService(userId);
};