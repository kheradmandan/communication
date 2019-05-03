import protection from "../../middlewares/protection";
import create from "./create";
import {readHeads, readDetails} from "./read";
import {addComment} from "./comments";

export default function (router) {
    router.post('/issues', protection, create);

    router.get('/issues', protection, readHeads);
    router.get('/issues/:uuid', protection, readDetails);

    router.post('/issues/assignees/:assigneeUuid/comments', protection, addComment);
}