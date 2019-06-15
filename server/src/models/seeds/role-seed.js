const Role = require('../role');

module.exports = async function originSeed(mongoose) {

    await mongoose.connection.db.dropCollection('roles');
    await Role.insertMany([
        {_id: 'issue-close-others', category:'issue' , level: 10 , title: 'issue close others'},
        {_id: 'issue-to-be-assignee', category:'issue', level: 10 , title: 'issue to be assignee'},
        {_id: 'issue-add-comment', category:'issue', level: 10 , title: 'issue add comment'},
        {_id: 'issue-add-attachment', category:'issue', level: 10 , title: 'issue add- attachment'},
        {_id: 'issue-remove-comment', category:'issue', level: 5 , title: 'issue remove comment'},
        {_id: 'issue-remove-attachment', category:'issue', level: 10 , title: 'issue remove attachment'},
        {_id: 'issue-change-status', category:'issue', level: 10 , title: 'issue change status'},
        {_id: 'issue-change-assignee', category:'issue', level: 10 , title: 'issue change assignee'},
        {_id: 'issue-change-priority', category:'issue', level: 10 , title: 'issue change priority'},
    ]);
};