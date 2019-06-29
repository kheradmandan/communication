const Era = require('../era');

module.exports = async function originSeed(mongoose) {

    await mongoose.connection.db.dropCollection('eras');
    await Era.insertMany([
        {_id: '5cf8efd21c3dc855e58756cd', origin: 2, originAncestors: [2, 1], title: 'سال ۱۳۹۸', inc: 1,},
        {_id: '5cf8efd21c3dc855e58756cc', origin: 3, originAncestors: [3, 1], title: 'سال ۱۳۹۸', inc: 10},
        {_id: '5cf8efd21c3dc855e58756ac', origin: 7, originAncestors: [7], title: 'سال ۱۳۹۸', inc: 2},
        {
            _id: '5cf8efd21c3dc855e58756ab', origin: 9, originAncestors: [7], title: '1398', inc: 1,
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    realms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    priorities: [0, 1, 2, 3],
                    connections: ['5cf80118b2b7b13c6dfe9f01', '5cf80118b2b7b13c6dfe9f02'],
                }, {
                    user: '5cf80118b2b7b13c6dfe9f01',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    realms: [1, 2, 3, 4, 5, 6],
                    priorities: [0, 1, 2],
                    connections: ['5cf80118b2b7b13c6dfe9f00'],
                }, {
                    user: '5cf80118b2b7b13c6dfe9f02',
                    roles: ['add-issue'],
                    realms: [1, 2, 3],
                    priorities: [0, 1],
                    connections: ['5cf80118b2b7b13c6dfe9f01'],
                },]
        },
        {
            _id: '5cf8efd21c3dc855e58756cf', origin: 13, originAncestors: [13, 12], title: 'بهار ۱۳۹۸', inc: 1,
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    realms: [1, 4, 5, 6, 7, 8, 9, 11],
                    priorities: [1, 3],
                    connections: ['5cf80118b2b7b13c6dfe9f01', '5cf80118b2b7b13c6dfe9f02'],
                }, {
                    user: '5cf80118b2b7b13c6dfe9f01',
                    roles: ['view-issue'],
                    realms: [1, 4, 5, 6],
                    priorities: [1, 2],
                    connections: ['5cf80118b2b7b13c6dfe9f00'],
                },
            ]
        },
    ]);
};