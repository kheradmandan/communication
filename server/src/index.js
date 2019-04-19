import express from 'express'
import bodyParser from 'body-parser'

const PORT = process.env['_COMMUNICATION_PORT'] || 8080;
const app = express();

app.use(bodyParser);

// Running
app.listen(PORT, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Server is listening on http://127.0.0.1:%d', PORT);
});
