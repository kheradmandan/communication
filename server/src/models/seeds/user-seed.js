const User = require('../user');

module.exports = async function userSeed(mongoose) {

    await mongoose.connection.db.dropCollection('users');
    await User.create({
        _id: '5cf80118b2b7b13c6dfe9f00',
        name: {
            gender: 'آقای',
            first: 'مرتضی',
            last: 'رییسی',
        },
        email: 'raeisi@zoho.com',
        group: {id: 8, title: 'برنامه نویس محاسب'},
        password: '123',
    });
    await User.create({
        _id: '5cf80118b2b7b13c6dfe9f01',
        name: {
            gender: 'آقای',
            first: 'داود',
            last: 'محمدی',
        },
        email: 'd.mohammadi.a@gmail.com',
        group: {id: 5, title: 'کارشناس مقیم'},
        password: '123',
    });
};