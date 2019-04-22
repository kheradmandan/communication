import CommunicationBaseError from './CommunicationBaseError'

/**
 * Mandatory field missing error
 * @class
 */

export default class FieldMissingError extends CommunicationBaseError {

    /**
     * @param message
     */
    constructor(message = 'Mandatory fields are missing in the payload') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = 422;
    }
}