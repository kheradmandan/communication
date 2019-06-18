const Era = require('../era');

module.exports = async function originSeed(mongoose) {

    await mongoose.connection.db.dropCollection('eras');
    await Era.insertMany([
        {_id: '5cf8efd21c3dc855e58756cd', origin: 2, originAncestors: [2, 1], title: 'سال ۱۳۹۸',},
        {_id: '5cf8efd21c3dc855e58756cc', origin: 3, originAncestors: [3, 1], title: 'سال ۱۳۹۸', inc: 10},
        {_id: '5cf8efd21c3dc855e58756ac', origin: 7, originAncestors: [7], title: 'سال ۱۳۹۸', inc: 2},
        {_id: '5cf8efd21c3dc855e58756ab', origin: 9, originAncestors: [7], title: '1398'},
        {_id: '5cf8efd21c3dc855e58756cf', origin: 13, originAncestors: [13, 12], title: 'بهار ۱۳۹۸'},
    ]);
};