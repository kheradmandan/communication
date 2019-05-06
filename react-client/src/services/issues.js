import API from "../utils/API";
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";
import * as requestTypes from "../constants/request.types";
import * as issueAction from "../actions/issues";
import {apiErrorHandler} from "./messages";

export const reloadIssues = () => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.ISSUE)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl('/issues');
    API
        .get(url)
        .then(({data: {data}}) => {
            dispatch(issueAction.reload(data));
        })
        .catch(apiErrorHandler(dispatch, getState))
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
            dispatch(issueAction.setCurrentIssueDetails(data));
        })
        .catch(apiErrorHandler(dispatch, getState))
        .finally(status.unset())
};
