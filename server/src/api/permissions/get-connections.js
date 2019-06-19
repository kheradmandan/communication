const Joi = require('@hapi/joi');
const connections = require('../../core/permissions/connections');
const CONSTANTS = require('../../core/constants');

/**
 * Controller for [GET permissions/connections/{id}/era] route.
 * @param server
 * @returns {Promise<void>}
 */

module.exports = async function (server) {
    server.route({
        method: 'GET',
        path: 'permissions/connections/{id}/era',
        handler,
        options: {
            validate
        }
    });
};

const validate = Joi.object({
    params: {
        id: CONSTANTS.joi.objectId(Joi).required(),
    }
});

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const eraId = request.params.id;

    return connections.forEra(currentUser._id, eraId);
};