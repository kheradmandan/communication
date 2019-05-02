import API from '../utils/API';
import * as ISSUES from '../constants/issues';
import * as requestTypes from '../constants/request.types';
import {remoteUrl} from "../utils/remote-utils";
import {setRequestStatus, unsetRequestStatus} from "./requests";

const wrapper = (payload) => !(payload instanceof Array) ? [payload] : payload;

export function reload(payload) {
    return {
        type: ISSUES.RELOAD,
        payload: wrapper(payload)
    }
}

export function append(payload) {
    return {
        type: ISSUES.APPEND,
        payload: wrapper(payload)
    }
}

export const reloadIssues = () => (dispatch, getState) => {
    const requestType = requestTypes.ISSUE;
    const requestIsInProgress = getState().requests.get(requestType);
    if (requestIsInProgress) {
        return;
    }
    dispatch(setRequestStatus(requestType, true));

    const url = remoteUrl('/issues');
    API.get(url)
        .then(({data: {data}}) => {
            dispatch(reload(data));
        })
        .catch(({data: {data: error}}) => {
            console.log('error - issue actions', error);
        })
        .finally(() => dispatch(unsetRequestStatus(requestType)))
};