import {Map} from "immutable";
import * as requestTypes from '../../constants/requests'

const initState = Map({});
export default function (state = initState, action) {
    switch (action.type) {
        case requestTypes.SET_REQUEST_STATUS:
            return state.set(action.requestType, action.status);

        case requestTypes.UNSET_REQUEST_STATUS:
            return state.set(action.requestType, undefined);

        default:
            return state;
    }
}