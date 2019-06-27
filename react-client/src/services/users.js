import {postApi} from "../utils/fetch";
import API from "../utils/API";
import * as userActions from "../actions/users";
import {AUTHENTICATE_USER} from "../constants/request.types";

export const auth = (email, password) => (dispatch, getState) => {

    postApi({
        data: {email, password},
        url: '/users/auth',
        title: AUTHENTICATE_USER,
        dispatches: [userActions.authSuccess],
        dispatch, getState,
        onSuccess: data => {
            API.defaults.headers['authorization'] = data.token;
            localStorage.setItem('auth', JSON.stringify(data));
        },
        onFailure: () => {
            dispatch(userActions.authFailure('Authentication failed.'));
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
        dispatch(userActions.authSuccess(data));
        API.defaults.headers['authorization'] = data.token;
    }
};