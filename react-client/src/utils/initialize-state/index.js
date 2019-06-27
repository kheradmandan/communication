export default function (dispatch, getState) {

    const session = getState().users.get('session');
    const currentUser = session.get('user');


}