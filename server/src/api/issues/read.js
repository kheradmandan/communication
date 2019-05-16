import {Issue, Sequelize, User} from '../../models';
import ForbiddenError from "../../errors/ForbiddenError";
import {safeAsync} from "../../core/safe-async";

export const readHeads = safeAsync(async function (req, res, next) {
    const currentUser = req.user;
    const {
        createdAt = new Date(),
        limit = 10,
    } = req.query;

    // passed
    res.locals.payload = await Issue
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

    next();
});


export const readDetails = safeAsync(async function (req, res, next) {
    const currentUser = req.user;
    const uuid = req.params.uuid;

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
    res.locals.payload = details.get();
    next();
});