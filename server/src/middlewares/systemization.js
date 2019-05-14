
/**
 * Systemization Errors: The last chance to handle errors
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default function (err, req, res, next) {
    res.locals.type = 'error';
    res.locals.status = err.code;
    res.locals.payload = {
        title: 'Unhandled error raised up',
        message: err.message
    };

    console.error(res.locals.payload);
    console.error(err);
    return next();
}