import express from 'express'
import {signIn} from "./users";

const router = express.Router();

router.use('/users/signIn', signIn);

export default router;