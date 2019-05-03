import API from '../utils/API';
import * as ISSUES from '../constants/issues';
import * as requestTypes from '../constants/request.types';
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";

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

export function setCurrentIssueDetails(payload) {
    return {
        type: ISSUES.GET_CURRENT_ISSUE_DETAILS,
        payload: payload
    }
}

export const reloadIssues = () => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.ISSUE)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl('/issues');
    API
        .get(url)
        .then(({data: {data}}) => {
            dispatch(reload(data));
        })
        .catch((response) => {
            console.log('error - issue actions', response.data.error);
        })
        .finally(status.unset())
};

export const getIssueDetails = (uuid) => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.ISSUE)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/issues/${uuid}`);
    API
        .get(url)
        .then(({data: {data}}) => {
            dispatch(setCurrentIssueDetails(data));
        })
        .catch((response) => {
            console.log('error - issue current actions', response);
        })
        .finally(status.unset())
};
