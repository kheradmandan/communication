import OperationError from "../errors/OperationError";

export default function (req, res, next) {
    const {payload} = res.locals;
    if (!payload) {
        const error = new OperationError('There is no response for your request.');
        error.appendMessage('Check your [url, params, html verb, etc]');
        error.code = 404;
        throw error;
    }
}