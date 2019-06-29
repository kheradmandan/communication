const Boom = require('@hapi/boom');
const permission = require('../../services/permissions');

/**
 * How able to do that
 * @param roleProvider
 * @returns {function([string],boolean=true): boolean}
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
    return (able = [], throwOnFail = true) => {

        let isAble = false;
        if (Array.isArray(able)) {
            isAble = availableRoles.some(role => able.some(indeed => indeed === role));
        } else {
            isAble = availableRoles.some(role => role === able);
        }

        if (throwOnFail && !isAble) {
            throw Boom.forbidden('You can not do that', able)
        }
        return isAble;
    };
};

/**
 * How able to do that on specific issue
 * @param userId
 * @param issueId
 * @returns {function([string],boolean=true): boolean}
 */

module.exports.canDoOnIssue = async (userId, issueId) => {
    const permissions = await permission.getRolesForIssue(userId, issueId);
    return module.exports.can(permissions);
};

/**
 * * How able to do that in specific era
 * @param userId
 * @param eraId
 * @returns {function([string],boolean=true): boolean}
 */

module.exports.canDoInEra = async (userId, eraId) => {
    const permissions = await permission.getRolesInEra(userId, eraId);
    return module.exports.can(permissions);
};