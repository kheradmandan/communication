import * as actions from "../actions/messages";

export const addMessage = (message, type = 'info') => (dispatch) => {
    switch (type) {
        case 'error':
            dispatch(actions.error(message));
            break;
        case 'warn':
            dispatch(actions.warn(message));
            break;
        default:
            dispatch(actions.info(message));
            break;
    }
};

export const removeMessage = (id) => (dispatch) => {
    dispatch(actions.remove(id));
};
export const removeMessageByType = (messageType) => (dispatch) => {
    dispatch(actions.removeType(messageType));
};

export const clearMessages = () => (dispatch) => {
    dispatch(actions.clear());
};

export const apiErrorHandler = (dispatch, getState) => error => {
    console.info(' apiErrorHandler %o', error);
    if (error.response && error.response.data && error.response.data.error === 'Unauthorized') {
        localStorage.clear();
        window.location.href = '/';
    }
    const {config} = error;
    addMessage(error.message + '\n' + config.url, 'error')(dispatch);
};