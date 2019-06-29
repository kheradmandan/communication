import {postApi} from '../utils/fetch';
import * as actions from '../actions/users';
import initializeState from '../utils/initialize-state';
import {
    AUTHENTICATE_USER
} from "../constants/request.types";

export const auth =
    (email, password) => (dispatch, getState) =>
        postApi({
            data: {email, password},
            url: '/users/auth',
            title: AUTHENTICATE_USER,
            dispatches: [actions.authSuccess],
            onSuccess: data => {
                initializeState(dispatch, getState);
                localStorage.setItem('auth', JSON.stringify(data));
            },
            onFailure: () => {
                dispatch(actions.authFailure('Authentication failed.'));
            }
        })(dispatch, getState,);


export const loadPrevSession =
    () => (dispatch, getState) => {

        const isSignedIn = getState().users.getIn(['session', 'isSignedIn']);
        if (isSignedIn) {
            return; // sign in already
        }

        const data = JSON.parse(localStorage.getItem('auth'));
        if (data && data.user && data.user._id && data.token) {
            dispatch(actions.authSuccess(data));
            initializeState(dispatch, getState);
        }
    };