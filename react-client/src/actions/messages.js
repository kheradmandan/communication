import * as messageConstants from '../constants/messages';

let idCounter = 1;

export function error(message) {
    return {
        type: messageConstants.ADD_ERROR,
        id: (idCounter++),
        message
    }
}

export function warn(message) {
    return {
        type: messageConstants.ADD_WARN,
        id: (idCounter++),
        message
    }
}

export function info(message) {
    return {
        type: messageConstants.ADD_INFO,
        id: (idCounter++),
        message
    }
}

export function remove(id) {
    return {
        type: messageConstants.REMOVE,
        id
    }
}

export function clear() {
    return {
        type: messageConstants.CLEAR
    }
}
