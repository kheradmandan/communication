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
    children: [{
        type: Number,
        ref: 'Origin'
    }],
    ancestors: [{
        type: Number,
        ref: 'Origin'
    }],
    eras: [{
        type: mongoose.ObjectId,
        ref: 'Era'
    }],
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
    },
    permissions: [PermissionSchema]
});

OriginSchema.index({title: 1});
OriginSchema.index({parent: 1});
OriginSchema.index({children: 1});
OriginSchema.index({ancestors: 1});

module.exports = mongoose.model('Origin', OriginSchema);