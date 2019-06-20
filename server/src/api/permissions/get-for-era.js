const Joi = require('@hapi/joi');
const roles = require('../../services/permissions/roles');
const connections = require('../../services/permissions/connections');
const CONSTANTS = require('../../core/constants');

/**
 * Controller for [GET permissions/connections/{id}/era] route.
 * @param server
 * @returns {Promise<void>}
 */

module.exports = async function (server) {
    server.route({
        method: 'GET',
        path: 'permissions/eras/{id}/{type}',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required(),
        type: Joi.string().valid(['connections', 'roles']).required(),
    })
};

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const eraId = request.params.id;
    const type = request.params.type;

    switch (type) {
        case 'connections':
            return connections.forEra(currentUser._id, eraId);
        case 'roles':
            return roles.forEra(currentUser._id, eraId);
        default:
            throw new Error('Type not specified in get permissions.')
    }
};