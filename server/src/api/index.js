import express from 'express'
import users from "./users";
import statics from './statics';

const router = express.Router();

// register routes
users(router);
statics(router);

export default router;