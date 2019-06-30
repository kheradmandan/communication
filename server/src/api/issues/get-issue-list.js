const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Issue = require('../../models/issue');
const CONSTANTS = require('../../core/constants').query.issue;

/**
 * Controller and Validator for [GET issues] route.
 * @param server
 * @param options
 */

module.exports = async function (server, options) {
    server.route({
        method: 'GET',
        path: 'issues',
        handler,
        options: {
            validate
        }
    });
};

const validate = {
    query: Joi.object({
        limit: Joi.number().default(10).max(100),
        'type[]': Joi.array().items(Joi.string().valid(CONSTANTS.getIssueList)).required(),
    })
};

const handler = async function (request) {
    const currentUser = request.auth.credentials;
    const {limit} = request.query;
    const types = request.query['type[]'] || ['assignee'];

    let criteria = [];
    types.forEach(type => {
        //['created', 'assignee', 'assigned', 'permitted'],
        switch (type) {
            case 'draft':
                criteria.push({'created.by': currentUser._id, 'statuses.0.id': 'draft'});
                break;
            case 'created':
                criteria.push({'created.by': currentUser._id, 'statuses.0.id': {$ne: 'draft'}});
                break;
            case 'assignee':
                criteria.push({'assignees.0.user': currentUser._id});
                break;
            case 'assigned':
                criteria.push({'assignees.user': currentUser._id});
                break;
            case 'permitted':
                //::TODO search by ability
                break;
            default:
                throw Boom.badRequest(`Type of '${type}' is undefined.`)
        }
    });

    return Issue
        .find({$or: criteria}, {
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
