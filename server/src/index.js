const Glue = require('@hapi/glue');
// const {sequelize} = require("./models");
const manifest = require('./conf/manifest');

const options = {
    relativeTo: __dirname
};

Glue
    .compose(manifest, options)
    .then(async (server) => {

        // // database
        // await sequelize.sync();
        // console.info('Sequelize connection was success.');

        // server instance
        await server.start();
        console.info('A Hapi server running at:', server.info.uri)
    })
    .catch(error => {
        console.error('error at running a Hapi server...', error);
    });