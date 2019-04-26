import express from 'express'
import users from "./users";
import issues from './issues';
import statics from './statics';

const router = express.Router();

// register routes
users(router);
issues(router);
statics(router);

export default router;