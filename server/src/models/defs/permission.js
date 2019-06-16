const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    roles: [String]
});

module.exports = PermissionSchema;