import {getApi, postApi} from '../utils/fetch';
import * as actions from '../actions/issues';
import {
    ADD_ISSUE,
    ADD_COMMENT,
    CHANGE_ASSIGNEE,
    LOAD_ISSUE_DETAILS,
    LOAD_ISSUE_LIST
} from '../constants/request.types';

export const reloadIssues =
    () =>
        getApi({
            url: '/issues',
            title: LOAD_ISSUE_LIST,
            dispatches: [actions.reload],
        });


export const getIssueDetails =
    id =>
        getApi({
            url: `/issues/${id}`,
            title: LOAD_ISSUE_DETAILS,
            dispatches: [actions.currentIssue],
        });

export const addComment =
    (issueId, context) =>
        postApi({
            url: `/issues/${issueId}/comments`,
            data: {context},
            title: ADD_COMMENT,
            dispatches: [actions.expireCurrentIssue],
        });


export const changeAssignee =
    (issueId, userId, title) =>
        postApi({
            url: `/issues/${issueId}/assignees`,
            data: {user: userId, title},
            title: CHANGE_ASSIGNEE,
            dispatches: [actions.assigneeHasChanged],
        });


export const updateDraft =
    payload => dispatch =>
        dispatch(actions.draftIssue(payload));


export const addIssue =
    ({era, realm, priority, title, context}) =>
        postApi({
            url: `/issues`,
            data: {era, realm, priority, title, context},
            title: ADD_ISSUE,
            dispatches: [actions.draftIssue],
        });
