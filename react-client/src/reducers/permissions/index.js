import {Map} from "immutable";
import {GET_PERMISSION_FOR_ERA} from "../../constants/permissions";

const initState = Map({});

export default function (state = initState, action) {
    switch (action.type) {
        case GET_PERMISSION_FOR_ERA:
            return state.set(action._id, Map(action.payload));

        default:
            return state;
    }
}