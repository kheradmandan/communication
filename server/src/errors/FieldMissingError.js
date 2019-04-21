/**
 * Mandatory field missing error
 * @class
 */

export default class FieldMissingError extends Error {

    /**
     * @param fields
     * @param message
     */
    constructor(fields = [],
                message = 'Mandatory fields are missing in the payload') {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = 422;
        if (fields instanceof Array) {
            this.fields = fields;
        } else {
            this.fields = Object.keys(fields) || [];
        }
    }
}