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
        .then(({data}) => {
            dispatch(issueAction.reload(data));
        })
        .catch(apiErrorHandler(dispatch, getState))
        .finally(status.unset())
};

export const getIssueDetails = (id) => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.ISSUE)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/issues/${id}`);
    API
        .get(url)
        .then(({data}) => {
            dispatch(issueAction.setCurrentIssueDetails(data));
        })
        .catch(apiErrorHandler(dispatch, getState))
        .finally(status.unset())
};

export const addComment = (assigneeUuid, context) => (dispatch, getState) => {
    const status = checkRequestProgress(requestTypes.ISSUE_STATE_CHANGING)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/issues/assignees/${assigneeUuid}/comments`);
    API
        .post(url, {context})
        .then(({data}) => {
            dispatch(issueAction.setCurrentIssueDetails({uuid: ''}));
        })
        .catch(apiErrorHandler(dispatch, getState))
        .finally(status.unset())
};
