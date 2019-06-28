import * as constants from '../constants/issues';

const wrapper = (payload) => !(payload instanceof Array) ? [payload] : payload;

export function reload(payload) {
    return {
        type: constants.RELOAD,
        payload: wrapper(payload)
    }
}

export function append(payload) {
    return {
        type: constants.APPEND,
        payload: wrapper(payload)
    }
}

export function currentIssue(payload) {
    return {
        type: constants.CURRENT_ISSUE,
        payload: payload
    }
}

export function expireCurrentIssue() {
    return {
        type: constants.EXPIRE_CURRENT_ISSUE,
    }
}

export function assigneeHasChanged() {
    return {
        type: constants.ASSIGNEE_HAS_CHANGED
    }
}

export function draftIssue(payload) {
    return {
        type: constants.DRAFT_ISSUE,
        payload
    }
}
