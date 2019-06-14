const Boom = require('@hapi/boom');

/**
 * System wide logger
 * @param server
 * @param option
 * @returns {Promise<void>}
 */
async function myHapiLogger(server, option) {

    server.events.on('log', function (message) {
        console.error('server log: %o', message);
    });

    server.events.on('request', function (request, event, tags) {
        const uri = `${new Date(event.timestamp).toUTCString()}: ${request.url.pathname} --> ${JSON.stringify(request.query)}`;

        if (Boom.isBoom(event.error)) {
            console.log('%s %s %o', uri, event.tags, event.error.output);

        } else {
            console.log(uri, event, tags);
        }
    });
}

module.exports.plugin = {
    register: myHapiLogger,
    version: '1.0.0',
    name: 'my-hapi-logger',
};