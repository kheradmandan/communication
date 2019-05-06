import {List, fromJS} from "immutable";
import * as messageConstants from '../../constants/messages';

const initState = List();

export default function (state = initState, action) {
    switch (action.type) {
        case messageConstants.ADD_INFO:
            return state.push(fromJS({type: 'info', message: action.message, id: action.id}));

        case messageConstants.ADD_ERROR:
            return state.push(fromJS({type: 'error', message: action.message, id: action.id}));

        case messageConstants.ADD_WARN:
            return state.push(fromJS({type: 'warn', message: action.message, id: action.id}));

        case messageConstants.REMOVE:
            return state.filter(x => x.get('id') !== action.id);

        case messageConstants.REMOVE_BY_TYPE:
            return state.filter(x => x.get('type') !== action.messageType);

        case messageConstants.CLEAR:
            return state.clear();

        default:
            return state;
    }
}