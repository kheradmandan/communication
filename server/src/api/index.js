// import express from 'express'
// import users from "./users";
const issues = require('./issues');
// import statics from './statics';
// import permissions from './permissions';
//
// const router = express.Router();
//
// // register routes
// users(router);
// issues(router);
// statics(router);
// permissions(router);
//
// export default router;
async function registerRoutes(server, option) {

    issues(server, option);
}

exports.plugin = {
    name: 'registerRoutes',
    register: registerRoutes,
};