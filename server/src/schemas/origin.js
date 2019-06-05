const mongoose = require('mongoose');

const OriginSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
        index: true,
    }
});

OriginSchema.index({title: 1});

module.exports = mongoose.model('Origin', OriginSchema);