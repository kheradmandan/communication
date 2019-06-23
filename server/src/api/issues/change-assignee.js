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
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

const handler = async function (request) {
    const userId = request.auth.credentials._id;
    const issueId = request.params.id;
    const {user, title} = request.payload;

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
        return {ok: true};
    }

    // save at first position
    issue.assignees.unshift(newAssignee);
    await issue.save();

    // populate and return new assignee
    issue.assignees = issue.assignees.slice(0, 1); // just the last one is enough
    const {assignees} = await Issue.populate(issue, {path: 'assignees.user', select: 'name'});
    return assignees[0];
};