const {sequelize, User} = require('../../models');
const {sign} = require('../../core/tokenizator');
const Joi = require('@hapi/joi');

module.exports.validate = {
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

module.exports.handler = async function (request, h) {

    const {email, password} = request.payload;

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
        throw new Error('Provided authentication data is not valid.');
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

    return generatePayload(user, userType);
};
