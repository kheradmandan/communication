const {ObjectId} = require('mongoose').Types;
const Realm = require('../../models/realm');
const User = require('../../models/user');
const Era = require('../../models/era');

/**
 * Retrieve all available permissions for specified user.
 * @param userId
 * @param eraId
 * @returns {Promise<Array>|Promise<*>}
 */
module.exports = async function (userId, eraId = null) {

    const matchClause = eraId ?
        {$match: {_id: ObjectId(eraId)}} : // for one era
        {$match: {'permissions.user': ObjectId(userId)}}; // in all eras

    let results = await Era
        .aggregate([
            matchClause,
            {$unwind: '$permissions'},
            {$match: {'permissions.user': ObjectId(userId)}},
            {
                $group:
                    {
                        _id: '$_id',
                        origin: {'$first': '$origin'},
                        title: {'$first': '$title'},
                        permission: {$push: '$permissions'},
                    }
            }
        ]);

    // not found
    if (results.length === 0) {
        return [];
    }

    // populate
    results = await User
        .populate(results, {
            path: 'permission.connections.user',
            select: 'name'
        });

    results = await Realm
        .populate(results, {
            path: 'permission.realms.realm',
            select: 'title'
        });

    results = await Era
        .populate(results, {
            path: 'origin',
            select: 'name title'
        });

    // there is one permission at most
    results.forEach(x => x.permission = x.permission[0]);
    return eraId ? results[0] : results;
};