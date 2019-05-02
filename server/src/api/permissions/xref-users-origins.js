import {User, xref_UsersOrigins} from '../../models';
import response from '../../core/response';
import ForbiddenError from "../../errors/ForbiddenError";

export default function (req, res, next) {
    const currentUser = req.user;
    const {uuid} = req.params;
    if (currentUser.uuid !== uuid) {
        throw new ForbiddenError()
    }

    User
        .findByPk(currentUser.uuid, {rejectOnEmpty: true})
        .then((user) =>
            xref_UsersOrigins
                .scope('origins')
                .findAll({where: {userUuid: user.uuid}})
        )
        .then(response(req, res, next))
        .catch(next);
}