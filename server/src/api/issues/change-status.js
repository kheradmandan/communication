const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
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
    const userId = request.auth.credentials._id;
    const issueId = request.params.id;
    const {id: statusId} = request.payload;

    // check issue
    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // do not change
    const lastStatus = issue.statuses[0];
    if (lastStatus.id === statusId) {
        return lastStatus;
    }

    // change to draft is not possible
    if (statusId === CONSTANTS.mongo.issue.statuses[0]) {
        throw Boom.badData(`Change status to ${statusId} is not possible.`);
    }

    // save at first position
    issue.changeStatus(statusId, userId);
    await issue.save();

    return issue.statuses[0];
};