const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const User = require('../../models/user');
const {sign} = require('../../core/tokenizator');

module.exports.validate = {
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

module.exports.handler = async function (request, h) {

    // validate
    const {email, password} = request.payload;
    const user = await User.findOne({email});

    // failed
    if (!user) {
        throw Boom.unauthorized('Provided authentication data is not valid.');
    }

    // get persist
    const match = await user.comparePassword(password);
    if (match !== true) {
        throw Boom.unauthorized('Provided authentication data is not valid.');
    }

    // explicitly define
    const credential = {
        _id: user._id,
        name: user.name,
        family: user.family,
        email: user.email,
        group: user.group,
    };

    // token
    const token = await sign(credential);
    return {
        type: 'jwt',
        token,
        user: {
            // explicitly again
            _id: user._id,
            name: user.name,
            family: user.family,
            email: user.email,
            group: user.group,
        }
    };
};
