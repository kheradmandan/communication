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
    }],
    realms: [{ /* Realms that can set*/
        _id: false,
        realm: {
            type: Number,
            required: true,
            ref: 'Realm'
        }
    }],
});

module.exports = PermissionSchema;