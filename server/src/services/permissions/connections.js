const {ObjectId} = require('mongoose').Types;
const User = require('../../models/user');
const Era = require('../../models/era');

/**
 * Retrieve all available people that user can assignee for an Era.
 * @param userId
 * @param eraId
 * @returns {Promise<{era: *, user: *, connections: Array}>}
 */
module.exports.forEra = async function getConnectionForEra(userId, eraId) {

    const results =
        await Era
            .aggregate([
                {$match: {_id: ObjectId(eraId)}},
                {$unwind: '$permissions'},
                {$match: {'permissions.user': ObjectId(userId)}},
                {$group: {_id: '$_id', connections: {$push: '$permissions.connections'}}}
            ]);

    const output = {
        era: eraId,
        user: userId,
        connections: [],
    };

    // not found
    if (results.length === 0 || results[0].connections.length === 0) {
        return output;
    }

    // populate
    const users = results[0].connections[0].map(x => x.user);
    output.connections = await User.find({_id: {$in: users}}, 'name').exec();
    return output;
};