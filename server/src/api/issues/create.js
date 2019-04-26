import {sequelize, Issue, User, Era} from '../../models';
import response from '../../core/response';
import FieldMissingError from "../../errors/FieldMissingError";

export default function (req, res, next) {
    const currentUser = req.user;
    const {
        intentionTo,
        eraUuid,
        priorityId = 0,
        statusId = 0,
        realmId,
        title,
    } = req.body;
    if (!intentionTo || !eraUuid || !title || !realmId) {
        throw new FieldMissingError().appendMessage(['intentionTo', 'eraUuid', 'realmId', 'title']);
    }

    Promise.all(
        [
            Era.findByPk(eraUuid, {
                include: ['Origin'],
                rejectOnEmpty: true
            }),
            User.findByPk(intentionTo, {
                rejectOnEmpty: true
            }),
            User.findByPk(currentUser.uuid, {
                rejectOnEmpty: true
            }),
        ])
        .then(([era, intention, creator]) =>
            sequelize.transaction(({transaction}) =>
                era
                    .increment('current', {by: era.getDataValue('increment')}, {transaction})
                    .then((era) =>
                        Issue
                            .create({
                                intentionTo: intention.uuid,
                                createdBy: creator.uuid,
                                eraUuid: era.uuid,
                                sequence: era.current,
                                priorityId,
                                statusId,
                                realmId,
                                title
                            }, {transaction})
                    )
            )
        )
        .then(issue => issue.get())
        .then(response(req, res))
        .catch(next)
}
