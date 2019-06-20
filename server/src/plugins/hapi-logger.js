const Boom = require('@hapi/boom');

/**
 * System wide logger
 * @param server
 * @param option
 * @returns {Promise<void>}
 */
async function myHapiLogger(server, option) {

    server.events.on('response', function (request) {
        console.log('> %o %s %O %s %o',
            new Date().toUTCString(),
            request.method.toUpperCase(),
            request.url.pathname,
            JSON.stringify(request.query),
            request.response.statusCode);
    });

    server.events.on('log', function (message) {
        console.error('server log: %o', message);
    });

    server.events.on('request', function (request, event, tags) {
        console.error('request log: %o >> tags: %o', event.error, tags);
    });
}

module.exports.plugin = {
    register: myHapiLogger,
    version: '1.0.0',
    name: 'my-hapi-logger',
};