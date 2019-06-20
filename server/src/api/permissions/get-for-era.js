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
    const userId = request.auth.credentials._id;
    const eraId = request.params.id;
    const type = request.params.type;

    const output = {
        era: eraId,
        user: userId,
    };

    switch (type) {
        case 'connections':
            output.connections = await connections.forEra(userId, eraId);
            break;
        case 'roles':
            output.roles = await roles.forEra(userId, eraId);
            break;
        default:
            throw new Error('Type not specified in get permissions.')
    }
    return output;
};