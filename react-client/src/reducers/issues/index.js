import {Map, List} from "immutable";
import * as ISSUES from '../../constants/issues';

const initState = Map({
    list: List(),
});

export default function (state = initState, action) {
    switch (action.type) {
        case ISSUES.RELOAD:
            return state.set('list', List(action.payload));
        case ISSUES.APPEND:
            return state.mergeDeepIn(['list'], action.payload);
        default:
            return state;
    }
}