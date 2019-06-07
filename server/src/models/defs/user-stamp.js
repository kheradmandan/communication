const mongoose = require('mongoose');

const UserStampSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    at: {
        type: Date,
        required: true,
        default: new Date(),
    }
}, {_id: false});

module.exports = UserStampSchema;