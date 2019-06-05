const auth = require('./auth');
const issues = require('./issues');
//const users = require('./users');
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

    auth(server, option);
    issues(server, option);
}

exports.plugin = {
    name: 'registerRoutes',
    register: registerRoutes,
};