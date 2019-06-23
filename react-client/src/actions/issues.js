import * as issueConstants from '../constants/issues';

const wrapper = (payload) => !(payload instanceof Array) ? [payload] : payload;

export function reload(payload) {
    return {
        type: issueConstants.RELOAD,
        payload: wrapper(payload)
    }
}

export function append(payload) {
    return {
        type: issueConstants.APPEND,
        payload: wrapper(payload)
    }
}

export function setCurrentIssueDetails(payload) {
    return {
        type: issueConstants.GET_CURRENT_ISSUE_DETAILS,
        payload: payload
    }
}

export function assigneeHasChanged(issueId, assginee) {
    return {
        type: issueConstants.ASSIGNEE_HAS_CHANGED,
        payload: assginee,
        issueId,
    }
}
