import {Map, fromJS} from 'immutable';
import {
    AVAILABLE_PERMISSIONS,
    GET_PERMISSION_FOR_ERA,
} from "../../constants/permissions";

const initState = Map({});

export default function (state = initState, action) {
    switch (action.type) {
        case AVAILABLE_PERMISSIONS:
            return action.payload
                .reduce((s, permission) =>
                        s.set(permission._id, fromJS(permission))
                    , state);

        case GET_PERMISSION_FOR_ERA:
            return state.set(action._id, fromJS(action.payload));

        default:
            return state;
    }
}