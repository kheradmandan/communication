import OperationError from "../errors/OperationError";

/**
 * Provides wide mechanism to handle Sequelize ORM errors
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default function (err, req, res, next) {
    if (/Sequelize.*Error/ig.test(err.name)) {
        const productionMode = process.env['NODE_ENV'] === 'production';
        const error = new OperationError();
        if (productionMode) {
            error.appendMessage('Something goes wrong with database or does not meet validations');
        } else {
            error.appendMessage(`[${err.name}] raised up`)
        }
        error.appendMessage('origin: ' + getAppropriateMessage(err));
        throw error;
    }
    next(err);
}

function getAppropriateMessage(err) {
    if (/SequelizeEmptyResultError/i.test(err.name)) {
        return 'Requested record does not exist. It maybe removed or disabled.'
    }
    return err.message;
}