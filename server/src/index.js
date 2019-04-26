import express from 'express'
import logger from 'morgan'
import cors from 'cors';
import {sequelize} from './models'
import api from './api'
import authorization from "./middlewares/authorization";
import sequelization from "./middlewares/sequelization";
import sterilization from "./middlewares/sterilization";
import systemization from "./middlewares/systemization";

// Sync database
sequelize
    .sync()
    .then(() => console.log('Sequelize sync was success.'))
    .catch(err => console.log('Sequelize sync was failed because of: %o', err));

const PORT = process.env['_COMMUNICATION_PORT'] || 8080;
const app = express();

// cross origin
app.use(cors);

// Register logger
app.use(logger("combined"));

// Parse json body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Parse JWT token
app.use(authorization);

// Navigate to api
app.use('/api/v1', api);

// Error Handlers
app.use(sequelization);
app.use(sterilization);
app.use(systemization);

// Running
app.listen(PORT, function (err) {
    if (err) {
        return console.error('Server running failed: %o', err);
    }
    console.log('Server is listening on http://127.0.0.1:%d', PORT);
});
