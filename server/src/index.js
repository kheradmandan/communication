import express from 'express'
import logger from 'morgan'
import authorization from './middlewares/authorization'
import db from './models'
import api from './api'

// Sync database
db.sequelize
    .sync()
    .then(() => console.log('Sequelize sync was success.'))
    .catch(err => console.log('Sequelize sync was failed because of: %o', err));

const PORT = process.env['_COMMUNICATION_PORT'] || 8080;
const app = express();

// Register logger
app.use(logger("combined"));

// Parse json body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Parse JWT token
app.use(authorization);

// Navigate to api
app.use('/api/v1', api);

// Running
app.listen(PORT, function (err) {
    if (err) {
        return console.error('Server running failed: %o', err);
    }
    console.log('Server is listening on http://127.0.0.1:%d', PORT);
});
