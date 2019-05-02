import API from '../utils/API';
import {remoteUrl} from "../utils/remote-utils";
import * as requestTypes from '../constants/request.types'
import {checkRequestProgress} from "../utils/checkRequestProgress";
import {AUTH_REQUEST_FAILURE, AUTH_REQUEST_SUCCESS} from "../constants/users";

export function authSuccess({type, token, user}) {
    return {
        type: AUTH_REQUEST_SUCCESS,
        token: type + ' ' + token,
        user
    }
}

export function authFailure(cause) {
    return {
        type: AUTH_REQUEST_FAILURE,
        cause
    }
}

export const auth = (email, password) => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.AUTH)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl('/users/auth');
    API
        .request({
            url,
            method: 'POST',
            data: {email, password}
        })
        .then(function ({data: {data}}) {
            dispatch(authSuccess(data));
            API.defaults.headers['authorization'] = data.type + ' ' + data.token;
            localStorage.setItem('auth', JSON.stringify(data));
        })
        .catch(function (error) {
            dispatch(authFailure(error.message))
        })
        .finally(status.unset());
};

export const loadPrevSession = () => (dispatch, getState) => {

    const session = getState().users.session;
    if (session && session.user && session.user.uuid) {
        return; // sign in already
    }

    const status = checkRequestProgress(requestTypes.AUTH)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }
    const data = JSON.parse(localStorage.getItem('auth'));
    if (data && data.user && data.user.uuid && data.token) {
        dispatch(authSuccess(data));
        API.defaults.headers['authorization'] = data.type + ' ' + data.token;
        console.log('previous session restored.');
    }
    status.unset()();
};