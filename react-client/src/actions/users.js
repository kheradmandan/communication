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

export const auth = ({email, password}) => (dispatch, getState) => {
    const requestType = requestTypes.AUTH;
    const requestProgress = getState().request.get(requestType);
    if (requestProgress) {
        return;
    }

    const url = remoteUrl('/users/auth');
    dispatch(setRequestStatus(requestType, true));

    fetch(url)
        .then(({data}) => {
            dispatch(authSuccess(data));
        })
        .catch(error => {
            dispatch(authFailure(error))
        })
        .finally(() => {
            dispatch(unsetRequestStatus(requestType));
        });
};