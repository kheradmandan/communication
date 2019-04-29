import protection from "../../middlewares/protection";
import create from "./create";
import read from "./read";

export default function (router) {
    router.get('/issues', protection, read);
    // router.get('/issues/:uuid', protection, read);
    router.post('/issues', protection, create);
}