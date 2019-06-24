const Joi = require('@hapi/joi');
const Attachment = require('../../models/attachment');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [GET users/{id}/avatar] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'GET',
        path: 'users/{id}/avatar',
        handler,
        options: {
            auth: false,
            validate
        }
    });
};

const validate = {
    params: Joi.object({
        id: CONSTANTS.joi.objectId(Joi).required(),
    })
};

const handler = async function (request, h) {
    const {id} = request.params;

    const attach = await Attachment
        .findOne({owner: id, ownerModel: 'User'})
        .exec();

    if (!attach) {
        return new Buffer([]);
    }

    return h.response(attach.data).type(attach.type);
};