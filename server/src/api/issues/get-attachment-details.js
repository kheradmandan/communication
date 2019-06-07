const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Attachment = require('../../models/attachment');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    params: Joi.object({
        issueId: CONSTANTS.joi.objectId(Joi).required(),
        attachmentId: CONSTANTS.joi.objectId(Joi).required(),
    })
};

module.exports.handler = async function (request, h) {
    const {issueId, attachmentId} = request.params;

    const attach = await Attachment
        .findOne({_id: attachmentId, owner: issueId, ownerModel: 'Issue'})
        .populate('created.by', 'name family')
    ;
    if (!attach) {
        throw Boom.badData('Specified attachment not found. Maybe you have not enough permission.');
    }

    return h.response(attach.data).type(attach.type);
};