const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    })
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;

    const role = await Issue.getRole(issueId, currentUser._id);
    console.log('your role is ', role);
    if (!['CREATOR', 'ASSIGNEE', 'ASSIGNED'].some(x => x === role)) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission. ' + role);
    }

    return Issue
        .findById(issueId)
        .populate('created.by', 'name');
};