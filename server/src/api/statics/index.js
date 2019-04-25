import models from '../../models'
import response from '../../core/response';
import protection from "../../middlewares/protection";
import OperationError from "../../errors/OperationError";

export default function (router) {
    router.get('/statics', protection, controller);
}

function controller(req, res, next) {
    const {name = 'all', limit = 500} = req.query;

    const available = ['Status', 'Priority', 'Realm', 'Origin'];
    const selectedModels = available.filter(x => name === 'all' || x.toLowerCase() === name.toLowerCase());
    if (selectedModels.length === 0) {
        throw new OperationError().appendMessage(`You have to provide correct static table name. ${name} is unknown`)
    }

    Promise
        .all(selectedModels
            .map(modelName =>
                models[modelName]
                    .findAll({limit})))
        .then(results => results.map((records, index) => ({[selectedModels[index]]: records})))
        .then(response(req, res))
        .catch(next);
}