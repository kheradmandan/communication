import {getApi, postApi} from '../utils/fetch';
import * as actions from '../actions/issues';

export const reloadIssues = () => (dispatch, getState) => {

    getApi({
        url: '/issues',
        title: 'reload-issues',
        dispatches: [actions.reload],
        dispatch, getState
    });

};

export const getIssueDetails = (id) => (dispatch, getState) => {

    getApi({
        url: `/issues/${id}`,
        title: 'get-issue-details',
        dispatches: [actions.currentIssue],
        dispatch, getState
    });

};

export const addComment = (issueId, context) => (dispatch, getState) => {

    postApi({
        data: {context},
        url: `/issues/${issueId}/comments`,
        title: 'add-comment-to-issue',
        dispatches: [actions.expireCurrentIssue],
        dispatch, getState
    });

};

export const changeAssignee = (issueId, userId, title) => (dispatch, getState) => {

    postApi({
        data: {user: userId, title},
        url: `/issues/${issueId}/assignees`,
        title: 'change-assignee',
        dispatches:[actions.assigneeHasChanged],
        dispatch, getState
    });

};
