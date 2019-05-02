import express from 'express'
import users from "./users";
import issues from './issues';
import statics from './statics';
import permissions from './permissions';

const router = express.Router();

// register routes
users(router);
issues(router);
statics(router);
permissions(router);

export default router;