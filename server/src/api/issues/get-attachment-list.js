const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const Attachment = require('../../models/attachment');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [GET issues/{id}/attachments] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'GET',
        path: 'issues/{id}/attachments',
        handler,
        options: {
            validate,
        }
    });
};
const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required()
    })
};

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;

    const issue = await Issue
        .findOne({_id: issueId, "created.by": currentUser._id})
        .exec()
    ;
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    return Attachment
        .find({owner: issue._id})
        .sort({'created.at': -1})
        .select('-data -ownerModel')
        .exec();
};