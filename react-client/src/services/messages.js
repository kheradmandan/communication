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
export const removeMessageByType = (messageType) => (dispatch) => {
    dispatch(messageActions.removeType(messageType));
};

export const clearMessages = () => (dispatch) => {
    dispatch(messageActions.clear());
};

export const apiErrorHandler = (dispatch, getState) => error => {
    const {config} = error;

    if (!error.response) {
        addMessage(error.message + '\n' + config.baseURL, 'error')(dispatch);
    } else if (error.response.data) {
        addMessage(error.response.data.error.message)(dispatch);
    }
};