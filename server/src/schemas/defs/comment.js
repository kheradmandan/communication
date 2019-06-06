const mongoose = require('mongoose');
const UserStampSchema = require('./user-stamp');
const CONSTANTS = require('../../core/constants').mongo.issue.comment;

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: CONSTANTS.context.minLength,
        maxLength: CONSTANTS.context.maxLength,
    },
    created: UserStampSchema,
});

module.exports = CommentSchema;