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
                    connections: [{user: '5cf80118b2b7b13c6dfe9f01'}, {user: '5cf80118b2b7b13c6dfe9f02'},],
                    realms: [
                        {realm: 1}, {realm: 2}, {realm: 3}, {realm: 4}, {realm: 5}, {realm: 6},
                        {realm: 7}, {realm: 8}, {realm: 9}, {realm: 10}, {realm: 11}
                    ]
                }, {
                    user: '5cf80118b2b7b13c6dfe9f01',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f00'}],
                    realms: [
                        {realm: 1}, {realm: 2}, {realm: 3}, {realm: 4}, {realm: 5}, {realm: 6},
                    ]
                }, {
                    user: '5cf80118b2b7b13c6dfe9f02',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f01'}],
                    realms: [
                        {realm: 1}, {realm: 2}, {realm: 3}
                    ]
                },]
        },
        {
            _id: '5cf8efd21c3dc855e58756cf', origin: 13, originAncestors: [13, 12], title: 'بهار ۱۳۹۸', inc: 1,
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'view-issue', 'add-comment'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f01'}, {user: '5cf80118b2b7b13c6dfe9f02'},],
                    realms: [
                        {realm: 1}, {realm: 4}, {realm: 5}, {realm: 6},
                        {realm: 7}, {realm: 8}, {realm: 9}, {realm: 11}
                    ]
                }, {
                    user: '5cf80118b2b7b13c6dfe9f01',
                    roles: ['view-issue'],
                    connections: [{user: '5cf80118b2b7b13c6dfe9f00'}],
                    realms: [
                        {realm: 1}, {realm: 4}, {realm: 5}, {realm: 6},
                    ]
                },
            ]
        },
    ]);
};