const {ObjectId} = require('mongoose').Types;
const User = require('../../models/user');
const Era = require('../../models/era');

/**
 * Retrieve all available people that user can assignee for an Era.
 * @param userId
 * @param eraId
 * @returns {Promise<Array>}
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

    // not found
    if (results.length === 0 || results[0].connections.length === 0) {
        return [];
    }

    // populate
    const users = results[0].connections[0].map(x => x.user);
    return User.find({_id: {$in: users}}, 'name').exec();
};