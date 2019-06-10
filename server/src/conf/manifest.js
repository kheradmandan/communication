const manifest = {
    server: {
        host: (process.env._COMMUNICATION_PORT) ? '0.0.0.0' : 'localhost',
        port: (process.env._COMMUNICATION_PORT || 8081),
        routes: {
            cors: true,
            validate: {
                failAction: require('../core/fail-action')
            }
        }
    },
    register: {
        plugins: [
            {plugin: 'hapi-auth-jwt2'},
            {plugin: './plugins/auth-strategy'},
            {plugin: './api/', routes: {prefix: '/api/v1/'}}
        ]
    }
};

module.exports = manifest;