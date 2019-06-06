const mongoose = require('mongoose');
const UserStampSchema = require('./defs/user-stamp');

const AttachmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    filename: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
    created: UserStampSchema,
});

module.exports = AttachmentSchema;