module.exports.mongo = {
    issue: {
        title: {
            minLength: 2,
            maxLength: 128,
        },
        assignee: {
            title: {
                minLength: 0,
                maxLength: 16,
            }
        },
        comment: {
            context: {
                minLength: 1,
                maxLength: 2048,
            }
        },
        statuses: ['draft', 'open', 'closed', 'removed', 'waiting'],
        priorities: ['low', 'normal', 'high', 'panic'],
    }
};

module.exports.joi = {
    objectId: (Joi) => Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
};
