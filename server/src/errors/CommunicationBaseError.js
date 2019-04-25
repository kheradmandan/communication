/**
 * @class CommunicationBaseError
 */
export default class CommunicationBaseError extends Error {

    /**
     * @param message
     */
    constructor(message = 'Your request cannot be done.') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = 500;
    }

    /**
     * @param message
     */
    appendMessage(message) {
        this.appendices = (this.appendices || []);
        this.appendices.push(message);
        return this;
    }
}