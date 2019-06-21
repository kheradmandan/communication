const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');
const forIssue = require('../../services/permissions/for-issue');

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

    // fetch roles
    const permissions = await forIssue(currentUser._id, issueId);
    if (permissions.length === 0) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    const issue = await Issue
        .findById(issueId, 'title sequence realm era statuses priorities assignees comments created')
        .populate('realm', 'title')
        .populate('statuses.created.by', 'name')
        .populate('priorities.created.by', 'name')
        .populate('assignees.user', 'name')
        .populate('assignees.created.by', 'name')
        .populate('comments.created.by', 'name')
        .populate('created.by', 'name').populate({
            path: 'era',
            select: 'title',
            populate: {
                path: 'origin',
                select: 'title'
            }
        });

    return {...issue.toJSON(), permissions};
};