const mongoose = require('mongoose');

const OriginSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    title: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        minLength: 2,
        maxLength: 32,
    }
});

OriginSchema.index({title: 1}, {unique: true});

module.exports = mongoose.model('Origin', OriginSchema);