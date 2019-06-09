const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Attachment = require('../../models/attachment');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [GET issues/{id}/attachments/{attachmentId}] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'GET',
        path: 'issues/{id}/attachments/{attachmentId}',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required(),
        attachmentId: CONSTANTS.joi.objectId(Joi).required(),
    })
};

const handler = async function (request, h) {
    const {id: issueId, attachmentId} = request.params;

    const attach = await Attachment
        .findOne({_id: attachmentId, owner: issueId, ownerModel: 'Issue'})
        .populate('created.by', 'name family');

    if (!attach) {
        throw Boom.badData('Specified attachment not found. Maybe you have not enough permission.');
    }

    return h.response(attach.data).type(attach.type);
};