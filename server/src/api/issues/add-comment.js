const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [POST issues/{id}/comments] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'POST',
        path: 'issues/{id}/comments',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    payload: Joi.object({
        context: Joi.string()
            .min(CONSTANTS.mongo.issue.comment.context.minLength)
            .max(CONSTANTS.mongo.issue.comment.context.maxLength)
            .required()
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {context} = request.payload;

    const newComment = {
        context,
        created: {
            by: currentUser._id,
            at: new Date()
        }
    };

    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // save comment at first position
    issue.comments.unshift(newComment);
    await issue.save();

    return issue.comments[0];
};