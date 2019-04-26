import {Map} from "immutable";
import {AUTH_REQUEST_FAILURE, AUTH_REQUEST_SUCCESS} from "../../constants/users";

const initState = Map({
    session: {user: {}}
});

export default function (state = initState, action) {
    switch (action.type) {
        case AUTH_REQUEST_SUCCESS:
            return state.set('session', {token: action.token, user: action.user});

        case AUTH_REQUEST_FAILURE:
            return state.set('session', {user: {}, cause: action.cause});

        default:
            return state;
    }
}