const Issue = require('../../models/issue');
const Origin = require('../../models/origin');

/**
 * Get all possible roles for issue
 * @param userId
 * @param issueId
 * @returns {Promise<*[]>}
 */
module.exports.forIssue = async function getIssuePermissions(userId, issueId) {

    const roles = [];
    const issue = await Issue
        .findById(issueId)
        .populate('era').select('permissions origin')
        .exec();
    roles.push(filterRoles(userId, issue.era));

    // extend from Origin
    const originPermissions = await module.exports.forOrigin(userId, issueId.era.origin);

    return [...new Set([...roles, ...originPermissions])]; // distinct
};

/**
 * Get all possible roles for origin
 * @param userId
 * @param originId
 * @returns {Promise<*[]>}
 */
module.exports.forOrigin = async function getOriginPermissions(userId, originId) {

    const roles = [];

    const origin = await Origin
        .findById(originId)
        .populate('parent').select('permissions')
        .populate('parent.parent').select('permissions')
        .exec();
    roles.push(filterRoles(userId, origin));
    roles.push(filterRoles(userId, origin.parent));

    return [...new Set(roles)]; // distinct
};

/**
 * Helper to filter roles
 * @param userId
 * @param target
 * @returns {T[]|Array}
 */
function filterRoles(userId, target) {
    if (target && target.permissions && target.permissions.length > 0) {
        return target.permissions.filter(x => x.key.toString() === userId);
    }
    return [];
}
