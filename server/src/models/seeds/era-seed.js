const Era = require('../era');

module.exports = async function originSeed(mongoose) {

    await mongoose.connection.db.dropCollection('eras');
    await Era.insertMany([
        {_id: '5cf8efd21c3dc855e58756cd', origin: 2, originAncestors: [2, 1], title: 'سال ۱۳۹۸',},
        {_id: '5cf8efd21c3dc855e58756cc', origin: 3, originAncestors: [3, 1], title: 'سال ۱۳۹۸', inc: 10},
        {_id: '5cf8efd21c3dc855e58756ac', origin: 7, originAncestors: [7], title: 'سال ۱۳۹۸', inc: 2},
        {
            _id: '5cf8efd21c3dc855e58756ab', origin: 9, originAncestors: [7], title: '1398',
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f01'}, {user: '5cf80118b2b7b13c6dfe9f02'},]
                }, {
                    user: '5cf80118b2b7b13c6dfe9f01',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f00'}]
                }, {
                    user: '5cf80118b2b7b13c6dfe9f02',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f01'}]
                },]
        },
        {_id: '5cf8efd21c3dc855e58756cf', origin: 13, originAncestors: [13, 12], title: 'بهار ۱۳۹۸'},
    ]);
};