const Joi = require('@hapi/joi');
const Issue = require('../../schemas/issue');

module.exports.validate = {
    query: Joi.object({
        limit: Joi.number().default(10).max(100)
    })
};

module.exports.handler = async function (request) {
    const currentUser = request.auth.credentials;
    const {limit} = request.query;

    return Issue
        .find({"assignees.0.user": currentUser._id})
        .limit(limit);
};
