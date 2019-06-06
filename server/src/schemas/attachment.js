const mongoose = require('mongoose');
const UserStampSchema = require('./defs/user-stamp');

const AttachmentSchema = new mongoose.Schema({
    owner: {
        id: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
            enum: ['Issue', 'User']
        }
    },
    title: {
        type: String,
        required:
            false,
    },
    filename: {
        type: String,
        required:
            true,
    },
    data: {
        type: Buffer,
        required:
            true,
    },
    created: UserStampSchema,
});

AttachmentSchema.index({'owner.id': 1, 'owner.name': 1});

module.exports = mongoose.model('Attachment', AttachmentSchema);