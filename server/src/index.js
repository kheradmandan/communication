import Glue from '@hapi/glue';
import {sequelize} from "./models";
import manifest from './conf/manifest';

Glue
    .compose(manifest)
    .then(async (server) => {

        // database
        await sequelize.sync();
        console.info('Sequelize connection was success.');

        // server instance
        await server.start();
        console.info('A Hapi server running at:', server.info.uri)
    })
    .catch(error => {
        console.error('error at running a Hapi server...', error);
    });