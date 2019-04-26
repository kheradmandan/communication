import CommunicationBaseError from '../errors/CommunicationBaseError';
import response from '../core/response';

/**
 * Handle api owned errors
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default function (err, req, res, next) {
    if (err instanceof CommunicationBaseError) {
        const payload = {
            requestedOrigin: req.url,
            message: err.message,
            appendices: err.appendices,
        };
        return response(req, res, {type: 'error', status: err.code})(payload);
    }
    next(err);
}