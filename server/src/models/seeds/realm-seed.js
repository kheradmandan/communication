const Realm = require('../realm');

module.exports = async function originSeed(mongoose) {

    await Realm.create({_id: 99999, parent: 0, title: 't'}); // ensure exists
    await mongoose.connection.db.dropCollection('realms');
    await Realm.insertMany([
        {_id: 0, title: "سرا"},
        {_id: 1, parent: 0, ancestors: [0], title: "شهرسازی"},
        {_id: 2, parent: 0, ancestors: [0], title: "حفاری"},
        {_id: 3, parent: 0, ancestors: [0], title: "مهندسین ناظر"},
        {_id: 4, parent: 0, ancestors: [0], title: "درآمد"},
        {_id: 5, parent: 0, ancestors: [0], title: "نوسازی"},
        {_id: 6, parent: 0, ancestors: [0], title: "کسب و پیشه"},
        {_id: 7, parent: 0, ancestors: [0], title: "ضابطه"},
        {_id: 8, parent: 0, ancestors: [0], title: "خلاف پویا"},
        {_id: 9, parent: 0, ancestors: [0], title: "کمیسیون"},
        {_id: 10, parent: 9, ancestors: [0, 9], title: "کمیسیون ماده ۷۷"},
        {_id: 11, parent: 9, ancestors: [0, 9], title: "کمیسیون ماده ۱۰۰"},
        {_id: 100, title: "آبفا"},
        {_id: 200, title: "املاک و مستغلات"},
        {_id: 300, title: "بانک"},
        {_id: 301, parent: 300, ancestors: [300], title: "بانک ملت"},
        {_id: 302, parent: 300, ancestors: [300], title: "بانک اقتصاد نوین"},
    ]);
};