const addComment = require('./add-comment');
const createIssue = require('./create');
const getIssueList = require('./get-issue-list');
const getIssueDetails = require('./get-issue-details');
const changeAssignee = require('./change-assignee');

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

};