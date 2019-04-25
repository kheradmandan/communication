import auth from './auth'

export default function (router) {

    router.use('/users/auth', auth);
}