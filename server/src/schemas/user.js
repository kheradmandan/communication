const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 32,
    },
    family: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 32,
    },
    group: {
        id: {type: Number, required: true, default: 0},
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 32,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        maxLength: 355,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.index({email: 1, name: 1, family: 1});

UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const password = this.password;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, password, function (err, isMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    })
};

module.exports = mongoose.model('User', UserSchema);