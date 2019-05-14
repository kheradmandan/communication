import CommunicationBaseError from '../errors/CommunicationBaseError';

/**
 * Handle api owned errors
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default function (err, req, res, next) {
    if (err instanceof CommunicationBaseError) {
        res.locals.type = 'error';
        res.locals.status = err.code;
        res.locals.payload = {
            url: req.method + ' ' + req.url,
            message: err.message,
            appendices: err.appendices,
        };
        return next();
    }
    next(err);
}