const Boom = require('@hapi/boom');
const Issue = require('../../schemas/issue');

module.exports.validate = {};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const issueId = request.params.id;
    const {File, title} = request.payload;

    const newAttachment = {
        title,
        filename: File.hapi.filename,
        data: new Buffer(File._data),
        created: {
            by: currentUser._id,
            at: new Date()
        }
    };

    const issue = await Issue.findById(issueId).exec();
    if (!issue) {
        throw Boom.badData('Specified issue not found. Maybe you have not enough permission.');
    }

    // save comment at first position
    issue.attachments.unshift(newAttachment);
    await issue.save();

    // return issue.attachments[0];
    const justCreated = issue.attachments[0];
    return {
        _id: justCreated._id,
        title: justCreated.title,
        filename: justCreated.filename,
        data: 'accepted'
    }
};