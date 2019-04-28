import response from '../core/response';

/**
 * Systemization Errors: The last chance to handle errors
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default function (err, req, res, next) {
    try {
        const payload = {
            title: 'Unhandled error raised up',
            message: err.message
        };
        console.error(payload);
        console.error(err);
        response(req, res, {type: 'error'})(payload);
    } catch (e) {
        console.log('!!! Dead Error Message: %o', e);
        res && res.end && res.end();
        process.exit((err && err.code) || -101)
    }
}