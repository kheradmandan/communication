import {combineReducers} from "redux";
import permissions from './permissions';
import messages from './messages';
import requests from './requests';
import issues from './issues';
import users from './users';

export default combineReducers({
    permissions,
    messages,
    requests,
    issues,
    users,
})