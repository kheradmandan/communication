const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../schemas/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    payload: Joi.object({
        id: Joi.string().valid(CONSTANTS.mongo.issue.statuses).required()
    }),
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    }),
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {id: statusId} = request.payload;

    const newStatus = {
        id: statusId,
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
    const lastStatus = issue.statuses[0];
    if (lastStatus.id === newStatus.id) {
        return lastStatus;
    }

    // change to draft is not possible
    if (newStatus.id === CONSTANTS.mongo.issue.statuses[0]) {
        throw Boom.badData(`Change status to ${newStatus.id} is not possible.`);
    }

    // save at first position
    issue.statuses.unshift(newStatus);
    await issue.save();

    return issue.statuses[0];
};