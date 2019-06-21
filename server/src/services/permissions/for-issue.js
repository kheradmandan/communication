const Issue = require('../../models/issue');
const roles = require('./roles');

/**
 * Fetch all available roles in issue for specified user.
 * @param userId
 * @param issueId
 * @returns {Promise<*[]>}
 */
module.exports = async function getPermissionsForIssue(userId, issueId) {

    // fetch issue
    const issue = await Issue.findById(issueId);
    if (!issue) {
        throw new Error('Issue Not Found');
    }
    const relation = issue.getRelation(userId);

    // fetch persists
    const settledRoles = await roles.forEra(userId, issue.era);

    // set defaults
    if ('CREATOR' === relation) {
        settledRoles.push(getDefaultOwnerRoles());

    } else if ('ASSIGNEE' === relation) {
        settledRoles.push(getDefaultAssigneeRoles());

    } else if ('ASSIGNED' === relation) {
        settledRoles.push(getDefaultAssignedRoles());
    }

    return [...new Set(settledRoles)]; // unique them
};

// Just hard code!
function getDefaultOwnerRoles() {
    return [
        'change-issue-priority',
        'change-issue-assignee',
        'archive-issue',
        'remove-issue',
        'close-issue',
        'add-comment-to-issue',
        'add-attachment-to-issue',
    ]
}

function getDefaultAssigneeRoles() {
    return [
        'change-issue-priority',
        'change-issue-assignee',
        'add-comment-to-issue',
        'add-attachment-to-issue',
    ]
}

function getDefaultAssignedRoles() {
    return [
        'view-issue'
    ]
}