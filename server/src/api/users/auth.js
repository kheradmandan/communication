import {sequelize, User} from '../../models'
import FieldMissingError from "../../errors/FieldMissingError";
import OperationError from "../../errors/OperationError";
import {safeAsync} from "../../core/safe-async-middleware";
import {sign} from "../../core/tokenizator";

export default safeAsync(async function (req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new FieldMissingError().appendMessage(['email', 'password']);
    }

    // validate
    const users = await sequelize.query(
        `SELECT "uuid", "email", "fullName", "userTypeId"
                     FROM "Users" 
                     WHERE "deletedAt" IS NULL AND "email" = :email AND "password" = crypt(:password,"password")
                     LIMIT 1;`,
        {
            model: User,
            replacements: {email, password},
            type: sequelize.QueryTypes.SELECT,
        });

    // failed
    if (!users || users.length !== 1) {
        throw new OperationError().appendMessage('Provided authentication data is not valid.');
    }

    // get persist
    const validatedUser = users[0];
    const [user, userType] = await Promise.all([
        validatedUser.get(),
        validatedUser.getUserType()
    ]);

    // token
    async function generatePayload(user, userType) {
        const {uuid, email, fullName, userTypeId, createdAt} = user;
        const token = await sign({uuid, email, fullName, userTypeId, createdAt});
        return {
            type: 'jwt',
            token,
            user: {
                uuid,
                email,
                fullName,
                userType,
            }
        };
    }

    // passed
    res.locals.payload = await generatePayload(user, userType);
    next();
})
