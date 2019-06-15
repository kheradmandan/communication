const mongoose = require('mongoose');
const PermissionSchema = require('./defs/permission');

const OriginSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    parent: {
        type: Number,
        ref: 'Origin'
    },
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
    },
    permissions: [PermissionSchema]
});

OriginSchema.index({title: 1});

module.exports = mongoose.model('Origin', OriginSchema);