import express from 'express'
import bodyParser from 'body-parser'
import authorization from './middlewares/authorization'
import db from './models'

// Sync database
db.sequelize
    .sync()
    .then(() => console.log('Sequelize sync was success.'))
    .catch(err => console.log('Sequelize sync was failed because of: %o', err));

const PORT = process.env['_COMMUNICATION_PORT'] || 8080;
const app = express();

// Parse json body
app.use(bodyParser);

// Parse JWT token
app.use(authorization);

// Running
app.listen(PORT, function (err) {
    if (err) {
        return console.error('Server running failed: %o', err);
    }
    console.log('Server is listening on http://127.0.0.1:%d', PORT);
});
