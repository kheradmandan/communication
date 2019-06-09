const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const User = require('../../models/user');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [POST issues/{id}/assignees] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'POST',
        path: 'issues/{id}/assignees',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    payload: Joi.object({
        user: CONSTANTS.joi.objectId(Joi).required(),
        title: Joi.string().default(null)
            .min(CONSTANTS.mongo.issue.assignee.title.minLength)
            .max(CONSTANTS.mongo.issue.assignee.title.maxLength),
        status: Joi.string().default('open').valid(CONSTANTS.mongo.issue.statuses.filter(x => x !== 'draft'))
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

const handler = async function (request) {
    const userId = request.auth.credentials._id;
    const issueId = request.params.id;
    const {user, title, status: statusId} = request.payload;

    const newAssignee = {
        user,
        title,
        created: {
            by: userId,
            at: new Date()
        }
    };

    // check user
    const userInstance = await User.findById(user).exec();
    if (!userInstance) {
        throw Boom.badData('Specified user not found. Maybe you have not enough permission.');
    }

    // check issue
    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // do not change
    const lastAssignee = issue.assignees[0];
    if (lastAssignee.user.toString() === newAssignee.user && lastAssignee.title === newAssignee.title) {
        return issue.assignees[0];
    }

    // change status if possible
    if (issue.statuses[0].id === 'draft') {
        issue.changeStatus(statusId, userId)
    }

    // save at first position
    issue.assignees.unshift(newAssignee);
    await issue.save();

    return issue.assignees[0];
};