const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Era = require('../../schemas/era');
const User = require('../../schemas/user');
const Issue = require('../../schemas/issue');
const CONSTANTS = require('../../core/constants');

module.exports.validate = {
    payload: Joi.object({
        era: CONSTANTS.joi.objectId(Joi).required(),
        title: Joi
            .string()
            .min(CONSTANTS.mongo.issue.title.minLength)
            .max(CONSTANTS.mongo.issue.title.maxLength)
            .required(),
        realm: Joi.number().required(),
        status: Joi.string().empty('').default('draft').valid(CONSTANTS.mongo.issue.statuses),
        priority: Joi.string().empty('').default('normal').valid(CONSTANTS.mongo.issue.priorities),
    })
};

module.exports.handler = async function (request, h) {

    const currentUser = request.auth.credentials;
    const {
        user = currentUser._id,
        era,
        priority,
        status,
        realm,
        title,
    } = request.payload;

    // insurance
    const userInstance = await User.findById(user, '_id');
    if (!userInstance) {
        throw Boom.badData('Specified user is not valid');
    }

    const eraInstance = await Era.findById(era);
    if (!eraInstance) {
        throw Boom.badData('Specified era is not valid');
    }

    // make sure all date are same
    const currentDate = new Date();
    const created = (id = userInstance._id) => ({by: id, at: currentDate});

    const sequence = await eraInstance.getNextSequence();

    // create
    const issue = new Issue({
        title,
        realm,
        era,
        sequence,
        statuses: [{id: status, created: created()}],
        priorities: [{id: priority, created: created()}],
        assignees: [{user: userInstance._id, created: created()}],
        created: created(),
    });
    await issue.save();

    return issue;
};
