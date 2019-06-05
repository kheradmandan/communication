const mongoose = require('mongoose');
const User = require('../schemas/user');
const conf = require('../conf');

module.exports = async function startMongo() {

    // Drive mongoDb Driver
    await mongoose.connect(conf.mongo.url, {useNewUrlParser: true});

    // Run seeds
    await seeds();
};

async function seeds() {
    if (!conf.global.isProductionMode) {
        await User.remove({email: 'raeisi@zoho.com'});
        const user = await User.findOne({email: 'raeisi@zoho.com'});
        if (!user) {
            const newUser = new User({
                name: 'مرتضی',
                family: 'رییسی',
                email: 'raeisi@zoho.com',
                group: {id: 8, title: 'برنامه نویس محاسب'},
                password: '123',
            });
            await newUser.save();
            console.log('root user created.');
        }
    }
}