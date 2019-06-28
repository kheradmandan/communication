const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Era = require('../../models/era');
const User = require('../../models/user');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants');

/**
 * Controller and Validator for [POST issues] route.
 * @param server
 * @param option
 */

module.exports = async function (server, option) {
    server.route({
        method: 'POST',
        path: 'issues',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    payload: Joi.object({
        era: CONSTANTS.joi.objectId(Joi).required(),
        user: CONSTANTS.joi.objectId(Joi),
        title: Joi
            .string()
            .min(CONSTANTS.mongo.issue.title.minLength)
            .max(CONSTANTS.mongo.issue.title.maxLength)
            .required(),
        context: Joi.string()
            .min(CONSTANTS.mongo.issue.comment.context.minLength)
            .max(CONSTANTS.mongo.issue.comment.context.maxLength),
        realm: Joi.number().required(),
        status: Joi.string().empty('').default('open').valid(CONSTANTS.mongo.issue.statuses),
        priority: Joi.number().default(1).valid(CONSTANTS.mongo.issue.priorities),
    })
};

const handler = async function (request, h) {

    const currentUser = request.auth.credentials;
    const {
        user = currentUser._id,
        era,
        priority,
        status,
        realm,
        title,
        context,
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
    const created = {by: userInstance._id, at: currentDate};

    const sequence = await eraInstance.getNextSequence();

    // create
    const issue = new Issue({
        title,
        realm,
        era,
        sequence,
        statuses: [{id: status, created}],
        priorities: [{id: priority, created}],
        assignees: [{user, created}],
        created,
    });

    // add comment if exists
    if (context) {
        issue.comments.unshift({
            context,
            created,
        });
    }

    // save
    await issue.save();
    return {Ok: true, _id: issue._id, era: issue.era, sequence: issue.sequence};
};
