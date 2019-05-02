import {User, xref_UsersOrigins, xref_OriginsRealms} from '../../models';
import response from '../../core/response';

export default function (req, res, next) {

    const currentUser = req.user;
    const {originId} = req.params;

    User
        .findByPk(currentUser.uuid, {rejectOnEmpty: true})

        /* Check user has permission to request origin at all! */
        .then((user) =>
            xref_UsersOrigins
                .findOne({
                    where: {
                        userUuid: user.uuid,
                        originId
                    },
                    rejectOnEmpty: true
                })
        )
        .then(() =>
            xref_OriginsRealms.scope('realms')
                .findAll({
                    where: {
                        originId
                    }
                })
        )
        .then(response(req, res, next))
        .catch(next);
}