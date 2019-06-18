const Origin = require('../origin');

module.exports = async function originSeed(mongoose) {
    await mongoose.connection.db.dropCollection('origins');
    await Origin.insertMany([
        {_id: 1, title: 'استان تهران', children: [2, 3, 4, 5]},
        {_id: 2, title: 'اندیشه', parent: 1, ancestors: [1], eras: ['5cf8efd21c3dc855e58756cd']},
        {_id: 3, title: 'ملارد', parent: 1, ancestors: [1], eras: ['5cf8efd21c3dc855e58756cc']},
        {_id: 4, title: 'اشتهارد', parent: 1, ancestors: [1]},
        {_id: 5, title: 'شهریار', parent: 1, ancestors: [1]},
        {
            _id: 6,
            title: 'استان قزوین',
            children: [7, 8, 9, 10, 11],
            permissions: [
                {user: '5cf80118b2b7b13c6dfe9f00', roles: ['view-issue', 'add-issue']}
            ]
        },
        {
            _id: 7,
            title: 'قزوین',
            parent: 6,
            ancestors: [6],
            eras: ['5cf8efd21c3dc855e58756ce'],
            permissions: [
                {user: '5cf80118b2b7b13c6dfe9f00', roles: ['add-issue']}
            ]
        },
        {_id: 8, title: 'تاکستان', parent: 6, ancestors: [6]},
        {
            _id: 9, title: 'اقبالیه', parent: 6, ancestors: [6],
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'change-issue-priority', 'change-issue-assignee', 'close-issue',]
                }
            ]
        },
        {
            _id: 10, title: 'زیباشهر', parent: 6, ancestors: [6],
            permissions: [
                {user: '5cf80118b2b7b13c6dfe9f00', roles: ['add-issue']}
            ]
        },
        {
            _id: 11, title: 'شال', parent: 6, ancestors: [6],
            permissions: [
                {user: '5cf80118b2b7b13c6dfe9f00', roles: ['add-issue']}
            ]
        },

        {
            _id: 12, title: 'چهارمحال و بختیاری', children: [13, 14],
            permissions: [
                {
                    user: '5cf80118b2b7b13c6dfe9f00',
                    roles: ['add-issue', 'change-issue-priority', 'change-issue-assignee', 'close-issue', 'add-comment-to-issue']
                }
            ]
        },
        {_id: 13, title: 'شهرکرد', parent: 12, ancestors: [12], eras: ['5cf8efd21c3dc855e58756cf']},
        {_id: 14, title: 'بروجن', parent: 12, ancestors: [12]},
    ]);
};