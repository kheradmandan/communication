const Joi = require('@hapi/joi');
const CONSTANTS = require('../../core/constants');
const permissionService = require('../../services/permissions');

/**
 * Controller for [GET permissions/connections/{id}/era] route.
 * @param server
 * @returns {Promise<void>}
 */

module.exports = async function (server) {
    server.route({
        method: 'GET',
        path: 'permissions/eras/{id}/{type?}',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required(),
        type: Joi.string().valid(['connections', 'roles']),
    })
};

const handler = async function (request) {
    const userId = request.auth.credentials._id;
    const eraId = request.params.id;
    const type = request.params.type;

    switch (type) {
        case 'connections':
            return permissionService.getConnections(userId, eraId);
        case 'roles':
            return permissionService.getRolesInEra(userId, eraId);
        case undefined:
            return permissionService.getPermissionsInEra(userId, eraId);
        default:
            throw new Error('Type not specified in get permissions.')
    }
};