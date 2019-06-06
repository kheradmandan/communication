const {readHeads, readDetails} = require("./read");
const createIssue = require('./create');

module.exports = function (server, options) {

    server.route({
        method: 'GET',
        path: 'issues/{id}',
        handler: readDetails,
    });

    server.route({
        method: 'GET',
        path: 'issues',
        handler: readHeads,
    });

    server.route({
        method: 'POST',
        path: 'issues',
        handler: createIssue.handler,
        options: {
            validate: createIssue.validate
        }
    });

    // router.post('/issues', protection, create);
    //
    // router.get('/issues', protection, readHeads);
    // router.get('/issues/:uuid', protection, readDetails);
    //
    // router.post('/issues/assignees/:assigneeUuid/comments', protection, addComment);
};