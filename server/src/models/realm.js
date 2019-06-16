const mongoose = require('mongoose');

const RealmSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    parent: {
        type: Number,
        ref: 'Realm'
    },
    ancestors: [{type: Number, ref: 'Realm'}],
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
    }
});

RealmSchema.index({title: 1});

module.exports = mongoose.model('Realm', RealmSchema);