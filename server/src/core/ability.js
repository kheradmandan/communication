const permission = require('../services/permissions');

/**
 * How able to do that
 * @param roleProvider
 * @returns {function([string]): boolean}
 */

module.exports.can = roleProvider => {

    // fetch roles
    let availableRoles = [];
    if (typeof roleProvider === 'function') {
        availableRoles = roleProvider();
        if (!Array.isArray(availableRoles)) {
            throw new Error('[roleProvider] must return an array.');
        }

    } else if (Array.isArray(roleProvider)) {
        availableRoles = roleProvider;

    } else {
        throw  new Error('[roleProvider] argument must be either array or function');
    }

    // ability
    return (able = []) => {
        if (Array.isArray(able)) {
            return availableRoles.some(role => able.some(role))
        }
        return availableRoles.some(role => role === able)
    };
};

/**
 * How able to do that on specific issue
 * @param userId
 * @param issueId
 * @returns {function([string]): boolean}
 */

module.exports.canDoOnIssue = (userId, issueId) => able => {

    return module.exports.can(permission.getRolesForIssue(userId, issueId))(able);
};

/**
 * * How able to do that in specific era
 * @param userId
 * @param eraId
 * @returns {function([string]): boolean}
 */

module.exports.canDoInEra = (userId, eraId) => able => {

    return module.exports.can(permission.getRolesInEra(userId, eraId))(able);
};