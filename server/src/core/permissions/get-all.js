const Origin = require('../../models/origin');

/**
 * Get all possible roles for specified user
 * @param userId
 * @returns {Promise<void>}
 */
module.exports = async function getAllPermissions(userId) {

    const predicate = {
        "$or": [
            {"permissions.user": userId},
            {"eras.permissions.user": userId}]
    };

    return await Origin
        .find(predicate).select('permissions eras')
        .populate('children', 'permissions eras', predicate);
};
