const Origin = require('../origin');

module.exports = async function originSeed(mongoose) {
    await mongoose.connection.db.dropCollection('origins');
    await Origin.insertMany([
        {_id: 1, title: 'تهران', children: [2, 3, 4, 5]},
        {_id: 2, title: 'اندیشه', parent: 1, ancestors: [1], eras: ['5cf8efd21c3dc855e58756cd']},
        {_id: 3, title: 'ملارد', parent: 1, ancestors: [1], eras: ['5cf8efd21c3dc855e58756cc']},
        {_id: 4, title: 'اشتهارد', parent: 1, ancestors: [1]},
        {_id: 5, title: 'شهریار', parent: 1, ancestors: [1]},
        {_id: 6, title: 'قزوین', children: [7, 8, 9, 10, 11], eras: ['5cf8efd21c3dc855e58756ce']},
        {_id: 7, title: 'قزوین', parent: 6, ancestors: [6]},
        {_id: 8, title: 'تاکستان', parent: 6, ancestors: [6]},
        {_id: 9, title: 'اقبالیه', parent: 6, ancestors: [6]},
        {_id: 10, title: 'زیباشهر', parent: 6, ancestors: [6]},
        {_id: 11, title: 'شال', parent: 6, ancestors: [6]},
        {_id: 12, title: 'چهارمحال و بختیاری', children: [13, 14]},
        {_id: 13, title: 'شهرکرد', parent: 12, ancestors: [12], eras: ['5cf8efd21c3dc855e58756cf']},
        {_id: 14, title: 'بروجن', parent: 12, ancestors: [12]},
    ]);
};