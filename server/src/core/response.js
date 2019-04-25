/**
 * Default options
 * @type {{extend: undefined, link: undefined, type: string, status: number}}
 */
const defaultOptions = {
    type: 'data',
    status: 200,
    extend: undefined,
    link: undefined,
};

/**
 * Default wrappers
 * @type {{data: (function(*): {data: *}), error: (function(*): {error: *})}}
 */
const wrappers = {
    data: (data) => ({data}),
    error: (error) => ({error}),
};

/**
 * Generate a callback mechanism to integrate response types.
 * @param req
 * @param res
 * @param options
 * @returns {Function}
 */

export default function response(req, res, options) {
    return function (payload) {
        options = {...defaultOptions, ...options};

        const wrapper = wrappers[options.type];
        if (!(wrapper instanceof Function)) {
            throw new Error(`Response type.${options.type} is not defined. type can be either 'data' or 'error'`)
        }

        // add links
        if (options.link instanceof Array) {
            options.link.forEach(x => res.link = {...res.link, ...x})
        } else {
            res.link = {...res.link, ...options.link};
        }

        if (typeof payload === 'string') {
            payload = {message: payload}
        }

        // merge extended data
        let mergedPayload = payload;
        if (!(payload instanceof Array)) {
            mergedPayload = {...payload, ...options.extend};
        }

        // provide response
        const wrappedPayload = wrapper(mergedPayload);

        res.status(options.status).json(wrappedPayload);
    };
}

