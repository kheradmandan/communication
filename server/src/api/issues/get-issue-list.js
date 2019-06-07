const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');

module.exports.validate = {
    query: Joi.object({
        limit: Joi.number().default(10).max(100),
        type: Joi.string().default('assignee').valid(['draft', 'mine', 'assignee']),
    })
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const {limit, type} = request.query;

    let criteria = {};
    switch (type) {
        case 'draft':
            criteria = {'created.by': currentUser._id, 'statuses.0.id': 'draft'};
            break;
        case 'mine':
            criteria = {'created.by': currentUser._id, 'statuses.0.id': {$ne: 'draft'}};
            break;
        case 'assignee':
            criteria = {'assignees.0.user': currentUser._id};
            break;

        default:
            throw Boom.badRequest(`Type of '${type}' is undefined.`)
    }

    return Issue
        .find(criteria, {
            assignees: {$slice: 1},
            statuses: {$slice: 1},
            priorities: {$slice: 1}
        })
        .select('title realm era statuses.id priorities.id sequence created')
        .populate('created.by', 'name')
        .populate('assignees.0.user', 'name')
        .populate('assignees.0.created.by', 'name')
        .populate('realm', 'title')
        .populate({
            path: 'era',
            select: 'title',
            populate: {
                path: 'origin',
                select: 'title'
            }
        })
        .limit(limit);
};
