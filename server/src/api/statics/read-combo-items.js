import models from "../../models";
import OperationError from "../../errors/OperationError";
import {safeAsync} from "../../core/safe-async-middleware";

export default safeAsync(async function (req, res, next) {
    const {name = 'all', limit = 500} = req.query;

    const available = ['Status', 'Priority', 'Realm', 'Origin'];
    const selectedModels = available.filter(x => name === 'all' || x.toLowerCase() === name.toLowerCase());
    if (selectedModels.length === 0) {
        throw new OperationError().appendMessage(`You have to provided correct static table name. ${name} is unknown`)
    }

    // fetch
    const results = await Promise.all(
        selectedModels.map(modelName =>
            models[modelName].findAll({limit}))
    );

    // format
    let formattedResults;
    if (results.length === 1) {
        formattedResults = results[0];
    } else {
        formattedResults = results.map((records, index) => ({[selectedModels[index]]: records}));
    }

    // pass
    res.locals.payload = formattedResults;
    next()
})