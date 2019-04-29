import {sequelize, User} from '../../models'
import {sign} from "../../core/tokenizator";
import FieldMissingError from "../../errors/FieldMissingError";
import OperationError from "../../errors/OperationError";
import response from '../../core/response';

export default function signIn(req, res, next) {

    const {email, password} = req.body;
    if (!email || !password) {
        throw new FieldMissingError().appendMessage(['email', 'password']);
    }

    sequelize.query(
        `SELECT "uuid", "email", "fullName", "userTypeId"
                     FROM "Users" 
                     WHERE "deletedAt" IS NULL AND "email" = :email AND "password" = crypt(:password,"password")
                     LIMIT 1;`,
        {
            model: User,
            replacements: {email, password},
            type: sequelize.QueryTypes.SELECT,
        })
        .then(users => {
            if (!users || users.length !== 1) {
                throw new OperationError()
                    .appendMessage('Provided authentication data is not valid.');
            }

            const user = users[0];
            return Promise.all([user.get(), user.getUserType()]);
        })
        .then(([user, userType]) => {
            const {uuid, email, fullName, userTypeId, createdAt} = user;
            return sign({uuid, email, fullName, userTypeId, createdAt})
                .then((token) => ({
                    type: 'jwt',
                    token,
                    user: {
                        uuid,
                        email,
                        fullName,
                        userType: userType
                    }
                }));
        })
        .then(response(req, res))
        .catch(next);
}
