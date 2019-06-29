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

export const apiErrorHandler = dispatch => error => {
    console.info(' apiErrorHandler %o', error);

    const {config} = error;
    let type = 'error';
    let message = error.message + '\n' + config.url;

    if (error.response) {
        const {status} = error.response;

        switch (status) {
            case 403:
            case 422:
                type = 'error';
                message = "منبع درخواستی با وجود ندارد یا شما اجازه دسترسی به آن را ندارید.";
                break;
            case 500:
                type = 'info';
                message = "سرور خطایی درونی داد.";
                break;
            default:
                type = 'error';
                message = error.message + '\n' + config.url;
        }
    }
    addMessage(message, type)(dispatch);

};