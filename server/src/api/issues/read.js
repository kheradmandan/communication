import {Sequelize, Issue, User, Era, Status, Priority} from '../../models';
import response from '../../core/response';

export default function (req, res, next) {
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