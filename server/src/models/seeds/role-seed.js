const Role = require('../role');

module.exports = async function originSeed(mongoose) {

    await Role.create({_id: 'insurance', category: 'c', level: 10, title: 't'}); // ensure exists
    await mongoose.connection.db.dropCollection('roles');
    await Role.insertMany([
        {_id: 'view-issue', level: 10, title: 'مشاهده'},
        {_id: 'add-issue', level: 10, title: 'افزودن'},
        {_id: 'change-issue-priority', level: 10, title: 'تغییر اولویت'},
        {_id: 'change-issue-priority-to-panic', level: 10, title: 'تغییر اولویت به بحرانی'},
        {_id: 'change-issue-assignee', level: 10, title: 'تعویض مسئول'},
        {_id: 'archive-issue', level: 10, title: 'آرشیو کردن'},
        {_id: 'remove-issue', level: 10, title: 'حذف کردن'},
        {_id: 'close-issue', level: 10, title: 'بستن'},
        {_id: 'add-comment-to-issue', level: 10, title: 'افزودن یادداشت'},
        {_id: 'add-attachment-to-issue', level: 10, title: 'افزودن پیوست'},
        {_id: 'remove-comment-from-issue', level: 5, title: 'حذف یادداشت'},
        {_id: 'remove-attachment-from-issue', level: 10, title: 'حذف پیوست'},
    ]);
};