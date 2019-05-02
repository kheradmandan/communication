import {sequelize, Issue, User, Era, Assignee} from '../../models';
import response from '../../core/response';
import FieldMissingError from "../../errors/FieldMissingError";

export default function (req, res, next) {
    const currentUser = req.user;
    const {
        userUuid = currentUser.uuid,
        eraUuid,
        priorityId = 0,
        statusId = 0,
        realmId,
        title,
    } = req.body;
    if (!eraUuid || !title || !realmId) {
        throw new FieldMissingError().appendMessage(['eraUuid', 'realmId', 'title']);
    }

    const rejectOnEmpty = true;
    Promise.all(
        [
            Era.findByPk(eraUuid, {rejectOnEmpty}),
            User.findByPk(userUuid, {rejectOnEmpty}),
            User.findByPk(currentUser.uuid, {rejectOnEmpty}),
        ])
        .then(([era, assignee, creator]) =>
            sequelize
                .transaction((transaction) =>
                    era
                        .increment('current', {by: era.getDataValue('increment')}, {transaction})
                        .then((era) =>
                            Issue
                                .create({
                                    createdBy: creator.uuid,
                                    eraUuid: era.uuid,
                                    sequence: era.current,
                                    priorityId,
                                    statusId,
                                    realmId,
                                    title
                                }, {transaction})
                        )
                        .then((issue) =>
                            Assignee
                                .create({
                                    issueUuid: issue.uuid,
                                    userUuid: assignee.uuid,
                                    createdBy: creator.uuid
                                }, {transaction})
                        )
                        .then(assignee =>
                            assignee
                                .setParent(assignee, {transaction})
                        )
                )
        )
        .then(assignee =>
            Issue
                .findAll({
                    where: {uuid: assignee.issueUuid},
                    include: [
                        {model: Assignee},
                    ]
                })
        )
        .then(response(req, res))
        .catch(next)
}
