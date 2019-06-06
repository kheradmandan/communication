const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const User = require('../../schemas/user');
const Issue = require('../../schemas/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    payload: Joi.object({
        user: CONSTANTS.joi.objectId(Joi).required(),
        title: Joi.string().default(null)
            .min(CONSTANTS.mongo.issue.assignee.title.minLength)
            .max(CONSTANTS.mongo.issue.assignee.title.maxLength)
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {user, title} = request.payload;

    const newAssignee = {
        user,
        title,
        created: {
            by: currentUser._id,
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

    // save at first position
    issue.assignees.unshift(newAssignee);
    await issue.save();

    return issue.assignees[0];
};