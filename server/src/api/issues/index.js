const addComment = require('./add-comment');
const createIssue = require('./create');
const getIssueList = require('./get-issue-list');
const changeStatue = require('./change-status');
const addAttachment = require('./add-attachment');
const changePriority = require('./change-priority');
const changeAssignee = require('./change-assignee');
const getIssueDetails = require('./get-issue-details');
const getAttachmentList = require('./get-attachment-list');

module.exports = function (server, options) {

    server.route({
        method: 'GET',
        path: 'issues',
        handler: getIssueList.handler,
        options: {
            validate: getIssueList.validate
        }
    });

    server.route({
        method: 'GET',
        path: 'issues/{id}',
        handler: getIssueDetails.handler,
        options: {
            validate: getIssueDetails.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues',
        handler: createIssue.handler,
        options: {
            validate: createIssue.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues/{id}/comments',
        handler: addComment.handler,
        options: {
            validate: addComment.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues/{id}/assignees',
        handler: changeAssignee.handler,
        options: {
            validate: changeAssignee.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues/{id}/statuses',
        handler: changeStatue.handler,
        options: {
            validate: changeStatue.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues/{id}/priorities',
        handler: changePriority.handler,
        options: {
            validate: changePriority.validate
        }
    });

    server.route({
        method: 'POST',
        path: 'issues/{id}/attachments',
        handler: addAttachment.handler,
        options: {
            payload: {
                maxBytes: 349525, // [1MB(1048576)/ 3]
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            validate: addAttachment.validate
        }
    });

    server.route({
        method: 'GET',
        path: 'issues/{id}/attachments',
        handler: getAttachmentList.handler,
        options: {
            validate: getAttachmentList.validate
        }
    });

};