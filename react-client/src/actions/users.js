import * as userConstants from "../constants/users";

export function authSuccess({token, user}) {
    return {
        type: userConstants.AUTH_REQUEST_SUCCESS,
        token,
        user
    }
}

export function authFailure(cause) {
    return {
        type: userConstants.AUTH_REQUEST_FAILURE,
        cause
    }
}
