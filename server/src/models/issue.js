const mongoose = require('mongoose');
const CommentSchema = require('./defs/comment');
const UserStampSchema = require('./defs/user-stamp');
const CONSTANTS = require('../core/constants').mongo.issue;

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: CONSTANTS.title.minLength,
        maxLength: CONSTANTS.title.maxLength,
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
            enum: CONSTANTS.statuses
        },
        created: UserStampSchema
    }],
    priorities: [{
        id: {
            type: String,
            required: true,
            enum: CONSTANTS.priorities
        },
        created: UserStampSchema
    }],
    assignees: [{
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            default: null,
            required: false,
            minLength: CONSTANTS.assignee.title.minLength,
            maxLength: CONSTANTS.assignee.title.maxLength,
        },
        created: UserStampSchema
    }],
    comments: [CommentSchema],
    created: UserStampSchema,
});

IssueSchema.index({era: 1, sequence: 1}, {unique: true});
IssueSchema.index({"assignees.user": 1});

IssueSchema.methods.changeStatus = function (statusId, userId) {

    // do not changed
    const lastStatus = this.statuses[0];
    if (lastStatus.id === statusId) {
        return;
    }

    const newStatus = {
        id: statusId,
        created: {
            by: userId,
            at: new Date()
        }
    };
    this.statuses.unshift(newStatus);
};

IssueSchema.methods.getRelation = function (userId) {

    if (this.created.by.toString() === userId) {
        return 'CREATOR';
    }
    if (this.assignees[0].user.toString() === userId) {
        return 'ASSIGNEE';
    }
    if (this.assignees.some(x => x.user.toString() === userId)) {
        return 'ASSIGNED';
    }
    return 'STRANGER';
};

module.exports = mongoose.model('Issue', IssueSchema);