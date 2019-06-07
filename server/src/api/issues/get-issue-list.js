const Joi = require('@hapi/joi');
const Issue = require('../../models/issue');

module.exports.validate = {
    query: Joi.object({
        limit: Joi.number().default(10).max(100)
    })
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const {limit} = request.query;

    return Issue
        .find({"assignees.0.user": currentUser._id}, {
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
