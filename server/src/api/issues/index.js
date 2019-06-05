import protection from "../../middlewares/protection";
import create from "./create";
import {addComment} from "./comments";

const {readHeads, readDetails} = require("./read");

module.exports = function (server, options) {

    server.route({
        method: 'GET',
        path: 'issues/{uuid}',
        handler: readDetails,
    });

    server.route({
        method: 'GET',
        path: 'issues',
        handler: readHeads,
    });

    // router.post('/issues', protection, create);
    //
    // router.get('/issues', protection, readHeads);
    // router.get('/issues/:uuid', protection, readDetails);
    //
    // router.post('/issues/assignees/:assigneeUuid/comments', protection, addComment);
};