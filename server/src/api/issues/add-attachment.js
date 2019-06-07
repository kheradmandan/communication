const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const Attachment = require('../../models/attachment');

module.exports.validate = {};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {File, title} = request.payload;

    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    const data = new Buffer(File._data);
    const newAttachment = new Attachment({
        owner: issue._id,
        ownerModel: 'Issue',
        title,
        type: File.hapi.headers['content-type'],
        filename: File.hapi.filename,
        data,
        size: data.length,
        created: {
            by: currentUser._id,
            at: new Date()
        }
    });
    // save comment at first position
    await newAttachment.save();

    return {
        _id: newAttachment._id,
        owner: newAttachment.owner,
        title: newAttachment.title,
        type: newAttachment.type,
        filename: newAttachment.filename,
        size: newAttachment.size,
        data: 'accepted'
    }
};