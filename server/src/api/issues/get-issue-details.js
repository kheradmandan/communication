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

    const issue = await Issue
        .findOne({_id: issueId, "created.by": currentUser._id})
        .populate('created.by', 'name family')
    ;
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    return issue;
};