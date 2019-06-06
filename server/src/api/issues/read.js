const {Issue, Sequelize, User} = require('../../models');

module.exports.readHeads = async function (request, h) {
    const currentUser = {uuid: 'ce0d1090-396f-4d2b-9f51-ee6ef2051a3f'};
    const {
        createdAt = new Date(),
        limit = 10,
    } = request.query;

    // passed
    return Issue
        .scope('view')
        .findAll(
            {
                where: {
                    createdBy: currentUser.uuid,
                    createdAt: {[Sequelize.Op.lte]: createdAt},
                    statusId: [0, 1, 2]
                },
                limit: limit + 1,
            }
        );
};


module.exports.readDetails = async function (request, h) {
    const currentUser = {uuid: 'ce0d1090-396f-4d2b-9f51-ee6ef2051a3f'};
    const uuid = request.params.uuid;

    // insurance
    const rejectOnEmpty = true;
    const [issue, user] = await Promise.all([
        Issue.findByPk(uuid, {rejectOnEmpty}),
        User.findByPk(currentUser.uuid, {rejectOnEmpty})
    ]);

    // permission check
    if (issue.createdBy !== user.uuid) {
        throw new ForbiddenError().appendMessage('You cannot touch this issue!');
    }

    // persist data
    const details = await Issue.scope(['view', 'details']).findByPk(issue.uuid);

    // passed
    return details.get();

};