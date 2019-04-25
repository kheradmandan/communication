import {sequelize, User} from '../../models'
import {sign} from "../../core/tokenizator";
import FieldMissingError from "../../errors/FieldMissingError";
import OperationError from "../../errors/OperationError";
import response from '../../core/response';

export default function signIn(req, res, next) {

    const {email, password} = req.body;
    if (!email || !password) {
        throw new FieldMissingError({email, password});
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
            if (!user || !user.length) {
                throw new OperationError()
                    .appendMessage('Provided authentication data is not valid.');
            }

            const {uuid, email, nickname} = user;
            return sign({uuid, email, nickname});
        })
        .then(token => response(req, res)({type: 'jwt', token}))
        .catch(next);
}
