const User = require('../user');

module.exports = async function userSeed() {

    // await User.remove({email: 'raeisi@zoho.com'});
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
};