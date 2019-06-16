const mongoose = require('mongoose');
const UserStampSchema = require('./defs/user-stamp');
const PermissionSchema = require('./defs/permission');

const EraSchema = new mongoose.Schema({
    origin: {
        type: Number,
        required: true,
        ref: 'Origin'
    },
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
    },
    seq: {type: Number, default: 0},
    inc: {type: Number, default: 1},
    permissions: [PermissionSchema],
    created: UserStampSchema,
    finished: UserStampSchema,
});

EraSchema.index({origin: 1, title: 1}, {unique: true});

EraSchema.methods.getNextSequence = async function getNextSequence() {
    // Race condition!!!
    this.seq += this.inc;
    await this.save();
    return this.seq;
};

module.exports = mongoose.model('Era', EraSchema);