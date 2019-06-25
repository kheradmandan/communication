const forIssue = require('./for-issue');
const available = require('./available');

/**
 * Retrieve whole permission
 * @param userId
 * @returns {Promise<*>}
 */
module.exports.getPermissions = async function (userId) {
    return available(userId);
};

/**
 * Retrieve whole permission for specified era
 * @param userId
 * @param eraId
 * @returns {Promise<{permission: {}, _id: *}>}
 */
module.exports.getPermissionsInEra = async function (userId, eraId) {
    return available(userId, eraId);
};

/**
 * Retrieve roles
 * @param userId
 * @param eraId
 * @returns {Promise<*[]|$group.roles|{$push}|string[]|string[]|string[]|Array>}
 */
module.exports.getRolesInEra = async function (userId, eraId) {

    const {permission} = await module.exports.getPermissionsInEra(userId, eraId);
    return permission.roles || [];
};

/**
 * Retrieve connections
 * @param userId
 * @param eraId
 * @returns {Promise<Array|connections|{_id, user}|number|Array|$group.connections|{$push}|*>}
 */
module.exports.getConnections = async function (userId, eraId) {

    const {permission} = await module.exports.getPermissionsInEra(userId, eraId);
    return permission.connections || [];
};

/**
 * Retrieve roles for an issue
 * @param userId
 * @param issueId
 * @returns {Promise<*[]>}
 */
module.exports.getRolesForIssue = async function (userId, issueId) {

    return  await forIssue(userId, issueId);
};
