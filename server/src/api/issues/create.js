import {sequelize, Issue, User, Era, Assignee} from '../../models';
import FieldMissingError from "../../errors/FieldMissingError";
import {safeAsync} from "../../core/safe-async-middleware";

export default safeAsync(async function (req, res, next) {
    const currentUser = req.user;
    const {
        userUuid = currentUser.uuid,
        eraUuid,
        viewpointId = 0,
        priorityId = 0,
        statusId = 0,
        realmId,
        title,
    } = req.body;
    if (!eraUuid || !title || !realmId) {
        throw new FieldMissingError().appendMessage(['eraUuid', 'realmId', 'title']);
    }

    // insurance
    const rejectOnEmpty = true;
    let [era, assigneeUserCandidate, creator] = await Promise.all([
        Era.findByPk(eraUuid, {rejectOnEmpty}),
        User.findByPk(userUuid, {rejectOnEmpty}),
        User.findByPk(currentUser.uuid, {rejectOnEmpty}),
    ]);

    let transaction;
    try {
        // start transaction
        transaction = await sequelize.transaction();

        // generate new sequence number
        era = await era.increment('current', {by: era.getDataValue('increment')}, {transaction});

        // save issue
        const issue = await Issue.create({
            createdBy: creator.uuid,
            eraUuid: era.uuid,
            sequence: era.current,
            priorityId,
            statusId,
            realmId,
            title
        }, {transaction});

        // create default assignee
        let assignee = await Assignee.create({
            issueUuid: issue.uuid,
            userUuid: assigneeUserCandidate.uuid,
            createdBy: creator.uuid,
            viewpointId
        }, {transaction});

        // self reference for head assignee
        assignee = await assignee.setParent(assignee, {transaction});

        // fetch created issue
        const createdIssue = await Issue
            .findAll({
                where: {uuid: assignee.issueUuid},
                include: [
                    {model: Assignee},
                ],
                transaction
            });

        // commit changes
        await transaction.commit();

        // passed
        res.locals.payload = createdIssue;
        next();

    } catch (e) {
        transaction && await transaction.rollback();
        throw e;
    }
})
