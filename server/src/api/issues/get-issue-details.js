const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');
const {forIssue} = require('../../core/permissions');

/**
 * Controller and Validator for [GET issues/{id}] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'GET',
        path: 'issues/{id}',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    })
};

const handler = async function (request) {
        const currentUser = request.auth.credentials;
        const issueId = request.params.id;

        // const role = await Issue.getRole(issueId, currentUser._id);
        const permissions = await forIssue(currentUser._id, issueId);
        console.log('your permissions are ', permissions);

        if (permissions.length === 0) {
            throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
        }

        const issue = await Issue
            .findById(issueId)
            .populate('statuses.created.by', 'name')
            .populate('priorities.created.by', 'name')
            .populate('assignees.user', 'name')
            .populate('assignees.created.by', 'name')
            .populate('comments.created.by', 'name')
            .populate('created.by', 'name');

        return {issue, permissions};
    }
;