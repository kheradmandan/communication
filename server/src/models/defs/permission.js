const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    roles: [String],
    connections: [{ /* People who can get assignee*/
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    }],
    realms: [{ /* Realms that can set*/
        type: Number,
        required: true,
        ref: 'Realm'
    }],
    priorities: [String],
});

module.exports = PermissionSchema;