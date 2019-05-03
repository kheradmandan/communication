import {Sequelize, Issue, User, Era, Status, Priority} from '../../models';
import response from '../../core/response';
import ForbiddenError from "../../errors/ForbiddenError";

/**
 * Proper list of all created issues
 * @param req
 * @param res
 * @param next
 */
export function readHeads(req, res, next) {
    const currentUser = req.user;
    const {
        createdAt = new Date(),
        limit = 10,
    } = req.query;

    Issue
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
        )
        .then(response(req, res))
        .catch(next);
}

export function readDetails(req, res, next) {
    const currentUser = req.user;
    const uuid = req.params.uuid;

    Promise.all(
        [
            Issue.findByPk(uuid, {rejectOnEmpty: true}),
            User.findByPk(currentUser.uuid, {rejectOnEmpty: true})
        ])
        .then(([issue, user]) => {
            if (issue.createdBy === user.uuid) {
                return Issue
                    .scope(['view', 'details'])
                    .findByPk(issue.uuid);
            }
            throw new ForbiddenError().appendMessage('You cannot touch this issue!');
        })
        .then(details => details.get())
        .then(response(req, res, next))
        .catch(next)
}