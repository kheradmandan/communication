const Joi = require('@hapi/joi');
const Attachment = require('../../models/attachment');

/**
 * Controller and Validator for [POST,PUT users/avatar] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: ['POST', 'PUT'],
        path: 'users/avatar',
        handler,
        options: {
            validate,
            payload: {
                maxBytes: 1000 * 300, // 300 Kb
                output: 'stream',
                parse: true
            }
        }
    });
};

const validate = {
    payload: Joi.object({
        file: Joi.any().required(),
        title: Joi.string(),
    })
};

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const userId = currentUser._id;
    const {file, title} = request.payload;

    const data = new Buffer(file._data);
    const newAttachment = {
        owner: userId,
        ownerModel: 'User',
        title,
        type: file.hapi.headers['content-type'],
        filename: file.hapi.filename,
        data,
        size: data.length,
        created: {
            by: currentUser._id,
            at: new Date()
        }
    };

    // create or update avatar
    await Attachment.update({owner: userId, ownerModel: 'User'}, newAttachment, {
        upsert: true,
        setDefaultsOnInsert: true
    });

    return {Ok: true}
};