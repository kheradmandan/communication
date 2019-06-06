const mongoose = require('mongoose');
const CommentSchema = require('./defs/comment');
const UserStampSchema = require('./defs/user-stamp');
const AttachmentSchema = require('./defs/attachment');

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128,
    },
    realm: {
        type: Number,
        required: true,
        ref: 'Realm',
    },
    era: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Era',
    },
    sequence: {
        type: String,
        required: true
    },
    statuses: [{
        id: {
            type: String,
            required: true,
            enum: ['draft', 'open', 'closed', 'removed', 'waiting']
        },
        created: UserStampSchema
    }],
    priorities: [{
        id: {
            type: String,
            required: true,
            enum: ['low', 'normal', 'high', 'panic']
        },
        created: UserStampSchema
    }],
    assignees: [UserStampSchema],
    comments: [CommentSchema],
    attachment: [AttachmentSchema],
    created: UserStampSchema,
});

IssueSchema.index({era: 1, sequence: 1}, {unique: true});
IssueSchema.index({"assignees.by": 1});

module.exports = mongoose.model('Issue', IssueSchema);