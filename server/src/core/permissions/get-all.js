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

    const select = 'title permissions eras';

    return await Origin
        .find(predicate).select(select)
        .populate('children', select);
};