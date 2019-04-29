import auth from './auth'

export default function (router) {

    router.post('/users/auth', auth);
}