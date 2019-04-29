import {Sequelize, Issue, User, Era, Status, Priority} from '../../models';
import response from '../../core/response';

export default function (req, res, next) {
    const currentUser = req.user;
    const {
        createdAt = new Date(),
        limit = 10,
    } = req.query;

    Issue
        .findAll(
            {
                where: {
                    createdBy: currentUser.uuid,
                    createdAt: {[Sequelize.Op.lte]: createdAt},
                    statusId: [0, 1, 2]
                },
                limit: limit + 1,
                include: [
                    {model: User, as: 'Creator'},
                    {model: Era},
                    {model: Status},
                    {model: Priority},
                ],
                attributes: ['uuid', 'title', 'eraUuid', 'createdAt', 'updatedAt']
            }
        )
        .then(response(req, res))
        .catch(next);
}