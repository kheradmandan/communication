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
        statuses: ['draft', 'open', 'closed', 'removed'],
        priorities: [0, 1, 2, 3],
    },
    user: {
        name: {
            genders: ['آقای', 'خانم'],
            first: {
                minLength: 3,
                maxLength: 32,
            },
            last: {
                minLength: 3,
                maxLength: 32,
            }
        },
        group: {
            title: {
                minLength: 3,
                maxLength: 32,
            }
        }
    }
};

module.exports.query = {
    issue: {
        getIssueList: ['created', 'assignee', 'assigned', 'permitted'],
    }
};

module.exports.joi = {
    objectId: (Joi) => Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
};
