const forEra = require('./by-era');
/**
 * Retrieve whole permission
 * @param userId
 * @param eraId
 * @returns {Promise<{permission: {}, _id: *}>}
 */
module.exports.getPermissionsInEra = async function (userId, eraId) {
    return forEra(userId, eraId);
};

/**
 * Retrieve roles
 * @param userId
 * @param eraId
 * @returns {Promise<*[]|$group.roles|{$push}|string[]|string[]|string[]|Array>}
 */
module.exports.getRolesInEra = async function (userId, eraId) {

    const {permission} = await forEra(userId, eraId);
    return permission.roles || [];
};

/**
 * Retrieve connections
 * @param userId
 * @param eraId
 * @returns {Promise<Array|connections|{_id, user}|number|Array|$group.connections|{$push}|*>}
 */
module.exports.getConnections = async function (userId, eraId) {

    const {permission} = await forEra(userId, eraId);
    return permission.connections || [];
};
