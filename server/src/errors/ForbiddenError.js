import CommunicationBaseError from "./CommunicationBaseError";

/**
 * @class OperationError Operation failed Error
 */

export default class ForbiddenError extends CommunicationBaseError {

    /**
     * @param message
     */
    constructor(message = 'Your request has been rejected because of either unavailable or forbidden resource.') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = 403;
    }
}