const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [POST issues/{id}/statuses] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'POST',
        path: 'issues/{id}/statuses',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    payload: Joi.object({
        status: Joi.string().valid(CONSTANTS.mongo.issue.statuses.filter(x => x !== 'draft')).required()
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

const handler = async function (request) {
    const userId = request.auth.credentials._id;
    const issueId = request.params.id;
    const {status} = request.payload;

    // check issue
    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // do not change
    const lastStatus = issue.statuses[0];
    if (lastStatus.id === status) {
        return lastStatus;
    }

    // save at first position
    issue.changeStatus(status, userId);
    await issue.save();

    return issue.statuses[0];
};