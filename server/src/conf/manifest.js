const manifest = {
    server:{
        host: (process.env.PORT) ? '0.0.0.0' : 'localhost',
        port: (process.env.PORT || 8081),
        routes: {
            cors: true
        }
    }
};

module.exports = manifest;