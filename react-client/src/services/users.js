import {postApi} from "../utils/fetch";
import * as actions from "../actions/users";
import {setAuthorization} from "../utils/remote-api-engine";
import {AUTHENTICATE_USER} from "../constants/request.types";

export const auth = (email, password) => (dispatch, getState) => {

    postApi({
        data: {email, password},
        url: '/users/auth',
        title: AUTHENTICATE_USER,
        dispatches: [actions.authSuccess],
        dispatch, getState,
        onSuccess: data => {
            setAuthorization(data);
            localStorage.setItem('auth', JSON.stringify(data));
        },
        onFailure: () => {
            dispatch(actions.authFailure('Authentication failed.'));
        }
    });
};

export const loadPrevSession = () => (dispatch, getState) => {

    const isSignedIn = getState().users.get('session').get('isSignedIn');
    if (isSignedIn) {
        return; // sign in already
    }

    const data = JSON.parse(localStorage.getItem('auth'));
    if (data && data.user && data.user._id && data.token) {
        dispatch(actions.authSuccess(data));
        setAuthorization(data);
    }
};