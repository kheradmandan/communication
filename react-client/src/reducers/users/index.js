import {Map, fromJS} from "immutable";
import {AUTH_REQUEST_FAILURE, AUTH_REQUEST_SUCCESS} from "../../constants/users";

const initState = Map({
    session: fromJS({isSignedIn: false, user: {}})
});

export default function (state = initState, action) {
    switch (action.type) {
        case AUTH_REQUEST_SUCCESS:
            return state.set('session', fromJS({isSignedIn: true, token: action.token, user: action.user}));

        case AUTH_REQUEST_FAILURE:
            return state.set('session', fromJS({isSignedIn: false, user: {}, cause: action.cause}));

        default:
            return state;
    }
}