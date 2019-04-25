/**
 * Generate a callback mechanism to integrate response types.
 * @param req
 * @param res
 * @param options
 * @returns {sender}
 */

export default function response(req, res, options = defaultOptions) {
    return new SendResponse(req, res, options);
}

/**
 * Default options
 * @type {{type: string, status: number}}
 */
const defaultOptions = {
    type: 'data',
    status: 200
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
 * An object that sends response
 * @param req
 * @param res
 * @param defaultOptions
 * @returns {sender}
 * @constructor
 */
function SendResponse(req, res, defaultOptions) {

    /**
     * Payload to send
     * @param payload
     * @param options
     */
    const sender = function (payload, options) {
        options = {...defaultOptions, ...options};

        const wrapper = wrappers[options.type];
        if (!(wrapper instanceof Function)) {
            throw new Error(`Response type.${options.type} is not defined. type can be either 'data' or 'error'`)
        }

        if (typeof payload === 'string') {
            payload = {message: payload}
        }

        const mergedPayload = {...payload, ...sender.extendPayload};
        const wrappedPayload = wrapper(mergedPayload);

        res.status(options.status).json(wrappedPayload);
    };

    /**
     *  Links that will add to response
     * @param link
     * @returns {sender}
     */
    sender.addLink = function (link) {
        res.link = {...res.link, ...link};
        return sender;
    };

    /**
     * Payload to extend payload
     * @param payload
     * @returns {sender}
     */
    sender.extend = function (payload) {
        sender.extendPayload = {...sender.extendPayload, ...payload};
        return sender;
    };

    return sender;
}

