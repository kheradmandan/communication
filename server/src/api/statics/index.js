import protection from "../../middlewares/protection";
import readComboItems from './read-combo-items';

export default function (router) {
    router.get('/statics', protection, readComboItems);
}
