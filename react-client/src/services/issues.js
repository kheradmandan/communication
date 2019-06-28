import {getApi, postApi} from '../utils/fetch';
import * as actions from '../actions/issues';
import {
    ADD_ISSUE,
    ADD_COMMENT,
    CHANGE_ASSIGNEE,
    LOAD_ISSUE_DETAILS,
    LOAD_ISSUE_LIST
} from '../constants/request.types';

export const reloadIssues = () => (dispatch, getState) => {

    getApi({
        url: '/issues',
        title: LOAD_ISSUE_LIST,
        dispatches: [actions.reload],
        dispatch, getState
    });

};

export const getIssueDetails = (id) => (dispatch, getState) => {

    getApi({
        url: `/issues/${id}`,
        title: LOAD_ISSUE_DETAILS,
        dispatches: [actions.currentIssue],
        dispatch, getState
    });

};

export const addComment = (issueId, context) => (dispatch, getState) => {

    postApi({
        url: `/issues/${issueId}/comments`,
        data: {context},
        title: ADD_COMMENT,
        dispatches: [actions.expireCurrentIssue],
        dispatch, getState
    });

};

export const changeAssignee = (issueId, userId, title) => (dispatch, getState) => {

    postApi({
        url: `/issues/${issueId}/assignees`,
        data: {user: userId, title},
        title: CHANGE_ASSIGNEE,
        dispatches: [actions.assigneeHasChanged],
        dispatch, getState
    });

};

export const addIssue = ({era, realm, priority, title, context}) => (dispatch, getState) => {

    postApi({
        url: `/issues`,
        data: {era, realm, priority, title, context},
        title: ADD_ISSUE,
        dispatches: [],
        dispatch, getState
    });

};
