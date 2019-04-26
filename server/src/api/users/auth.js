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
        `SELECT "uuid", "email", "nickname"
                     FROM "Users" 
                     WHERE "deletedAt" IS NULL AND "email" = :email AND "password" = crypt(:password,"password")
                     LIMIT 1;`,
        {
            model: User,
            replacements: {email, password},
            type: sequelize.QueryTypes.SELECT,
        })
        .then(user => {
            if (!user || user.length !== 1) {
                throw new OperationError()
                    .appendMessage('Provided authentication data is not valid.');
            }

            const {uuid, email, nickname, createdAt} = user[0];
            return sign({uuid, email, nickname, createdAt})
                .then((token) => ({type: 'jwt', token, user: {uuid, email, nickname}}));

        })
        .then(response(req, res))
        .catch(next);
}
