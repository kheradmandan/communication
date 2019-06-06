const Boom = require('@hapi/boom');
const Issue = require('../../schemas/issue');

module.exports.readHeads = async function (request) {
    const currentUser = request.auth.credentials;
    const {
        limit = 10,
    } = request.query;

    return Issue
        .find({"assignees.0.user": currentUser._id})
        .limit(limit);
};


module.exports.readDetails = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;

    const issue = await Issue
        .findOne({_id: issueId, "created.by": currentUser._id})
        .populate('created.by', 'name family')
    ;
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    return issue;
};