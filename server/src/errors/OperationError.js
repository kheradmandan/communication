import CommunicationBaseError from "./CommunicationBaseError";

/**
 * @class OperationError Operation failed Error
 */

export default class OperationError extends CommunicationBaseError {

    /**
     * @param message
     */
    constructor(message = 'Requested operation cannot be done. Verify data and try again.') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = 400;
    }
}