const Origin = require('../../models/origin');

/**
 * Get all possible roles for specified user
 * @param userId
 * @returns {Promise<void>}
 */
module.exports = async function getAllPermissions(userId) {
    return await Origin
        .find({"permissions.user": userId}).select('permissions')
        .populate('children', 'permissions', {"permissions.user": userId});
};
