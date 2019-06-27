import {Map, fromJS} from 'immutable';
import {
    AVAILABLE,
    SPECIFIED_ERA_ONLY,
} from "../../constants/permissions";

const initState = Map({});

export default function (state = initState, action) {
    switch (action.type) {
        case AVAILABLE:
            return action.payload
                .reduce((s, permission) =>
                        s.set(permission._id, fromJS(permission))
                    , state);

        case SPECIFIED_ERA_ONLY:
            return state.set(action._id, fromJS(action.payload));

        default:
            return state;
    }
}