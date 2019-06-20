const {ObjectId} = require('mongoose').Types;
const Era = require('../../models/era');

/**
 * Retrieve all available roles in an Era.
 * @param userId
 * @param eraId
 * @returns {Promise<{era: *, roles: Array, user: *}>}
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

    const output = {
        era: eraId,
        user: userId,
        roles: [],
    };

    // found
    if (results.length !== 0) {
        output.roles = results[0].roles;
    }
    return output;
};