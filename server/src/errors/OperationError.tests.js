import {describe} from 'mocha'
import {expect} from 'chai'
import OperationError from './OperationError'

describe('OperationError', () => {

    it('Should be instance of Error', () => {
        const operationError = new OperationError();

        expect(operationError).to.be.instanceOf(Error);
        expect(operationError).to.be.instanceOf(OperationError);
        expect(operationError.code).to.be.equals(400);
    });

    it('Should customize message', () => {
        const customizeMessage = 'Customized message';
        const operationError = new OperationError(customizeMessage);

        expect(operationError.message).to.be.equals(customizeMessage);
    });

});