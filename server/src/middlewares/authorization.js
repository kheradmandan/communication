import {verify} from '../core/tokenizator'

export default function (req, res, next) {

    // Clear uninvited user
    req.user = undefined;

    //something like 'jwt auth.token.string
    const header = req.get('Authorization') || '';
    const parts = header.split(' ');

    if (parts.length === 2 && parts[0] === 'jwt') {
        const token = parts[1];
        verify(token)
            .then(data => req.user = data)

            // logger can go here
            .catch(() => req.user = undefined)

            .finally(() => next());

    } else {
        return next();
    }
}
