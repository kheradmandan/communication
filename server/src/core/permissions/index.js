const Issue = require('../../models/issue');

module.exports.forIssue = async function getIssuePermissions(userId, issueId) {

    const roles = [];

    function pushRoles(permissions) {
        if (permissions && permissions.length > 0) {
            roles.push(permissions.filter(x => x.key.toString() === userId))
        }
    }

    const issue = await Issue
        .findById(issueId)
        .populate('era').select('permissions')
        .populate('era.origin').select('permissions')
        .exec();
    pushRoles(issue.era.permissions);
    pushRoles(issue.era.origin.permissions);

    return [...new Set(roles)]; // distinct
};