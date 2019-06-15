const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    category: String,
    level: Number,
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
    }
});

module.exports = mongoose.model('Role', RoleSchema);