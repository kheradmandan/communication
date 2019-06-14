const Boom = require('@hapi/boom');

/**
 * System wide logger
 * @param server
 * @param option
 * @returns {Promise<void>}
 */
async function myHapiLogger(server, option) {

    server.events.on('response', function (request) {
        request.log('info', request.response.statusCode);
    });

    server.events.on('log', function (message) {

        console.error('server log: %o', message);
    });

    server.events.on('request', function (request, event, tags) {
        const uri = `[${new Date(event.timestamp).toUTCString()}] ${request.method.toUpperCase()} ${request.url.pathname} ${JSON.stringify(request.query)}`;

        if (Boom.isBoom(event.error)) {
            console.log('%s %s %o', uri, event.tags, event.error.output);

        } else {
            if (tags.info) {
                console.log('%s --> %o',uri, event.data);
            } else {
                console.log(uri, event, tags);
            }
        }
    });
}

module.exports.plugin = {
    register: myHapiLogger,
    version: '1.0.0',
    name: 'my-hapi-logger',
};