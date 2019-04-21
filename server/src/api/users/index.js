import {sequelize, User} from '../../models'
import FieldMissingError from "../../errors/FieldMissingError";
import {sign} from "../../core/tokenizator";

export {
    signIn
}

function signIn(req, res, next) {

    const {email, password} = req.body;
    if (!email || !password) {
        throw new FieldMissingError({email, password});
    }

    User
        .findAll({where: {email, password: sequelize.fn('crypt', password, '"password"')}})
        .then(user => {
            if (!user || !user.length) throw new Error('Sign in failed because of wrong values');

            const {uuid, email, nickname} = user;
            return sign({uuid, email, nickname});
        })
        .then(token => res.json({data: {type: 'jwt', token}}))
        .catch(next);
}
