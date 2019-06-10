const fs = require('fs');
const path = require('path');

/**
 * Find Controllers and register their routes
 * @param server
 * @param option
 * @returns {Promise<void>}
 */
async function registerRoutes(server, option) {

    fs
        .readdirSync(__dirname)

        // Pull directories only
        .filter(fileOrDir => fileOrDir.indexOf('.') === -1)

        // Directory contents
        .forEach(directory => {
            fs
                .readdirSync(path.resolve(__dirname, directory))

                // Filter default paths
                .filter(filename => filename !== 'index.js')

                // Register one by one
                .forEach(async filename => {

                    const route = require(path.resolve(__dirname, directory, filename));
                    await route(server, option)

                });
        });
}

exports.plugin = {
    ...require('./package'),
    register: registerRoutes,
};