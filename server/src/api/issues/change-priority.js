const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    payload: Joi.object({
        id: Joi.string().valid(CONSTANTS.mongo.issue.priorities).required()
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {id: priorityId} = request.payload;

    const newPriority = {
        id: priorityId,
        created: {
            by: currentUser._id,
            at: new Date()
        }
    };

    // check issue
    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // do not change
    const lastPriority = issue.priorities[0];
    if (lastPriority.id === newPriority.id) {
        return lastPriority;
    }

    // save at first position
    issue.priorities.unshift(newPriority);
    await issue.save();

    return issue.priorities[0];
};