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
    on: {
        type: mongoose.Schema.ObjectId,
        required: true,
        enum: ['Issue', 'User']
    },
    created: UserStampSchema,
});

module.exports = mongoose.model('Attachment', AttachmentSchema);