import {Map, List, fromJS} from "immutable";
import * as ISSUES from '../../constants/issues';

const initState = Map({
    list: List(),
});

export default function (state = initState, action) {
    switch (action.type) {
        case ISSUES.RELOAD:
            return state.set('list', fromJS(action.payload));
        case ISSUES.APPEND:
            return state.mergeDeepIn(['list'], fromJS(action.payload));
        case ISSUES.GET_CURRENT_ISSUE_DETAILS:
            return state.set('current', fromJS(action.payload));
        default:
            return state;
    }
}