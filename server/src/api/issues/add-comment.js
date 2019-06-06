const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../schemas/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
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

module.exports.handler = async function (request) {
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