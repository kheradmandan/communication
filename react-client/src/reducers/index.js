import {combineReducers} from "redux";
import permissions from './permissions';
import requests from './requests';
import issues from './issues';
import users from './users';

export default combineReducers({
    permissions,
    requests,
    issues,
    users,
})