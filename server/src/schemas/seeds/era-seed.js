const Era = require('../era');

module.exports = async function originSeed(mongoose) {

    await mongoose.connection.db.dropCollection('eras');
    Era.insertMany([
        {_id: '5cf8efd21c3dc855e58756cd', origin: 2, title: 'سال ۱۳۹۸', start: 100},
        {_id: '5cf8efd21c3dc855e58756cc', origin: 3, title: 'سال ۱۳۹۸', start: 100, inc: 10},
        {_id: '5cf8efd21c3dc855e58756ce', origin: 6, title: 'سال ۱۳۹۸', start: 10000, inc: 2},
        {_id: '5cf8efd21c3dc855e58756cf', origin: 13, title: 'بهار ۱۳۹۸'},
    ]);
};