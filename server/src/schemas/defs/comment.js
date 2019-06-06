const mongoose = require('mongoose');
const UserStampSchema = require('./user-stamp');

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 2048,
    },
    on: {
        type: mongoose.Schema.ObjectId,
        required: true,
        enum: ['Issue']
    },
    created: UserStampSchema,
});

module.exports = CommentSchema;