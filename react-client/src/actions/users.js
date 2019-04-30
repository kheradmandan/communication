import API from '../utils/API';
import {remoteUrl} from "../utils/remote-utils";
import {setRequestStatus, unsetRequestStatus} from "./requests";
import * as requestTypes from '../constants/request.types'
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
    const requestType = requestTypes.AUTH;
    const requestProgress = getState().requests.get(requestType);
    if (requestProgress) {
        return;
    }

    const url = remoteUrl('/users/auth');
    dispatch(setRequestStatus(requestType, true));

    API
        .request({
            url,
            method: 'POST',
            data: {email, password}
        })
        .then(function ({data: {data}}) {
            API.defaults.headers['authorization'] = data.type + ' ' + data.token;
            localStorage.setItem('auth', JSON.stringify(data));
            return dispatch(authSuccess(data));
        })
        .catch(function (error) {
            dispatch(authFailure(error.message))
        })
        .finally(function () {
            dispatch(unsetRequestStatus(requestType));
        });
};