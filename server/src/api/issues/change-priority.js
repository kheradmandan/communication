const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [POST issues/{id}/priorities] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'POST',
        path: 'issues/{id}/priorities',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    payload: Joi.object({
        id: Joi.number().valid(CONSTANTS.mongo.issue.priorities).required()
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

const handler = async function (request) {
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