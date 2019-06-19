const Era = require('../../models/era');

/**
 * Retrieve all available people that user can assignee for an Era.
 * @param userId
 * @param eraId
 * @returns {Promise<void>}
 */
module.exports.forEra = async function getConnectionForEra(userId, eraId) {

    const predicate = {_id: eraId, "permissions.user": userId};
    const fields = ' permissions.connections';

    return await Era
        .find(predicate, fields)
        .populate('ancestors', fields, predicate);
};