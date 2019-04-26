import protection from "../../middlewares/protection";
import create from "./create";

export default function (router) {
    router.use('/issues', protection, create);
}