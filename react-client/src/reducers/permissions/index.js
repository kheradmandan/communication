import {Map, List} from "immutable";
import {XREF_ORIGINS_REALMS, XREF_USERS_ORIGINS} from "../../constants/permissions";

const initState = Map({});

export default function (state = initState, action) {
    switch (action.type) {
        case XREF_USERS_ORIGINS:
            return state.set('xref-users-origins', List(action.payload));

        case XREF_ORIGINS_REALMS:
            return state.setIn(['xref-origins-realms', action.originId], List(action.payload));

        default:
            return state;
    }
}