import response from '../core/response';

export default function (req, res) {
    try {
        // 404
        if (!res.locals.payload) {
            res.locals.payload = {
                url: req.method + ' ' + req.url,
                message: 'Check your [url, params, html verb, etc].',
            };
            res.locals.type = 'error';
            res.locals.status = 404;
        }

        // start your journey
        const {payload} = res.locals;
        response(req, res, {
            type: res.locals.type || 'data',
            link: res.locals.link,
            status: res.locals.status || 200,
            extend: res.locals.extend,
        })(payload);

    } catch (e) {
        console.error('!!! Dead Error Message: %o', e);
        res && res.end && res.end();
    }
}