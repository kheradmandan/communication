const {ObjectId} = require('mongoose').Types;
const Era = require('../../models/era');

/**
 * Retrieve all available roles in an Era.
 * @param userId
 * @param eraId
 * @returns {Promise<Array>}
 */
module.exports.forEra = async function getRoleForEra(userId, eraId) {

    const results =
        await Era
            .aggregate([
                {$match: {_id: ObjectId(eraId)}},
                {$unwind: '$permissions'},
                {$match: {'permissions.user': ObjectId(userId)}},
                {$group: {_id: '$_id', roles: {$push: '$permissions.roles'}}}
            ]);

    // not found
    if (results.length === 0) {
        return [];
    }
    return results[0].roles;
};