import express from 'express'
import users from "./users";

const router = express.Router();

// register routes
users(router);

export default router;