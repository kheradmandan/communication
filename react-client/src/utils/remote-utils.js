export const remoteBaseUrl = 'http://5.201.184.44:8081/api/v1';//'http://127.0.0.1:8081/api/v1';

export const remoteUrl = (extendUrl) => {
    if (extendUrl.indexOf('/') > 0) {
        extendUrl = '/' + extendUrl;
    }
    return remoteBaseUrl + extendUrl;
};

export const avatarUrl = userId => remoteUrl(`users/${userId}/avatar`);