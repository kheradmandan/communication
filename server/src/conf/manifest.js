const manifest = {
    server: {
        host: (process.env.PORT) ? '0.0.0.0' : 'localhost',
        port: (process.env.PORT || 8081),
        routes: {
            cors: true
        }
    },
    register: {
        plugins: [
            {plugin: './api/', routes: {prefix: '/api/v1/'}}
        ]
    }
};

module.exports = manifest;