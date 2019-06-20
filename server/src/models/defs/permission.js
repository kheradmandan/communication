const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    roles: [String],
    connections: [{ /* People who can get assignee*/
        _id: false,
        user: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
});

module.exports = PermissionSchema;