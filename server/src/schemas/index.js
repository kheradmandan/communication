const mongoose = require('mongoose');
const seed = require('../schemas/seeds');
const conf = require('../conf');

module.exports = async function startMongo() {

    // Drive mongoDb Driver
    await mongoose.connect(conf.mongo.url, conf.mongo.options);

    // Run seeds
    await seed(mongoose);
};
