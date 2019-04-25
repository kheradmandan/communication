import {describe} from 'mocha'
import {expect} from 'chai'
import CommunicationBaseError from './CommunicationBaseError'
import FieldMissingError from "./FieldMissingError";
import OperationError from "./OperationError";
import ForbiddenError from "./ForbiddenError";

describe('My Errors', () => {
    [
        CommunicationBaseError,
        FieldMissingError,
        OperationError,
        ForbiddenError
    ]
        .forEach(testMyError);
});

function testMyError(ErrorType) {

    describe(ErrorType.prototype.constructor.name, () => {


        it(`Should be instance of Error`, () => {
            const operationError = new ErrorType();
            expect(operationError).to.be.instanceOf(Error);
        });

        it(`Should be instance of CommunicationBaseError`, () => {
            const operationError = new ErrorType();
            expect(operationError).to.be.instanceOf(CommunicationBaseError);
        });

        it('Should have proper status code', () => {
            const operationError = new ErrorType();
            expect(operationError.code).to.be.greaterThan(299);
        });

        it('Should customize message', () => {
            const customizeMessage = 'Customized message';
            const operationError = new ErrorType(customizeMessage);
            expect(operationError.message).to.be.equals(customizeMessage);
        });

        it('Should append additional messages', () => {
            const additionalMessage1 = 'additional message 1';
            const additionalMessage2 = 'additional message 2';
            const additionalMessage3 = 'additional message 3';

            const operationError = new ErrorType()
                .appendMessage(additionalMessage1)
                .appendMessage(additionalMessage2)
                .appendMessage(additionalMessage3)
            ;
            expect(operationError.appendices).to.be.eqls([
                additionalMessage1,
                additionalMessage2,
                additionalMessage3]);
        });
    });
}