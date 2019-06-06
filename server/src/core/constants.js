module.exports.mongo = {
    issue: {
        statuses: ['draft', 'open', 'closed', 'removed', 'waiting'],
        priorities: ['low', 'normal', 'high', 'panic'],
    }
};

module.exports.joi = {
    objectId: (Joi) => Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
};
