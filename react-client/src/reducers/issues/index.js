import {Map, List, fromJS} from 'immutable';
import {
    APPEND,
    RELOAD,
    CURRENT_ISSUE,
    EXPIRE_CURRENT_ISSUE,
    ASSIGNEE_HAS_CHANGED,
} from '../../constants/issues';

const initState = Map({
    list: List(),
});

export default function (state = initState, action) {
    switch (action.type) {
        case RELOAD:
            return state.set('list', fromJS(action.payload));

        case APPEND:
            return state.mergeDeepIn(['list'], fromJS(action.payload));

        case CURRENT_ISSUE:
            return state.set('current', fromJS(action.payload));

        case ASSIGNEE_HAS_CHANGED:
        case EXPIRE_CURRENT_ISSUE:
            return state.set('current', fromJS({_id: state.getIn(['current', '_id']), reloadRequired: true}));

        default:
            return state;
    }
}