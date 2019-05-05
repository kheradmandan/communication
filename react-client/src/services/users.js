import API from "../utils/API";
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";
import * as requestTypes from "../constants/request.types";
import * as userActions from "../actions/users";

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
            dispatch(userActions.authSuccess(data));
            API.defaults.headers['authorization'] = data.type + ' ' + data.token;
            localStorage.setItem('auth', JSON.stringify(data));
        })
        .catch(function (error) {
            dispatch(userActions.authFailure(error.message))
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
        dispatch(userActions.authSuccess(data));
        API.defaults.headers['authorization'] = data.type + ' ' + data.token;
    }
    status.unset()();
};