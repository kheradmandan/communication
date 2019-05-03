import * as messageActions from "../actions/messages";

export const addMessage = (message, type = 'info') => (dispatch) => {
    switch (type) {
        case 'error':
            dispatch(messageActions.error(message));
            break;
        case 'warn':
            dispatch(messageActions.warn(message));
            break;
        default:
            dispatch(messageActions.info(message));
            break;
    }
};

export const removeMessage = (id) => (dispatch) => {
    dispatch(messageActions.remove(id));
};

export const clearMessages = () => (dispatch) => {
    dispatch(messageActions.clear());
};