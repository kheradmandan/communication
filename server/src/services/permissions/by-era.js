const {ObjectId} = require('mongoose').Types;
const User = require('../../models/user');
const Era = require('../../models/era');

/**
 * Retrieve permissions for specified user in an era.
 * @param userId
 * @param eraId
 * @returns {Promise<{permissions: Array, _id: *}>}
 */
module.exports = async function (userId, eraId) {

    let results = await Era
        .aggregate([
            {$match: {_id: ObjectId(eraId)}},
            {$unwind: '$permissions'},
            {$match: {'permissions.user': ObjectId(userId)}},
            {$group: {_id: '$_id', permissions: {$push: '$permissions'}}}
        ]);

    // not found
    if (results.length === 0) {
        return {
            _id: eraId,
            permissions: [],
        };
    }

    // populate
    results = await User
        .populate(results, {
            path: 'permissions.connections.user',
            select: 'name'
        });
    return results[0];
};