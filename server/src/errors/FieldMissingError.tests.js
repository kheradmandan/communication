import {describe} from 'mocha'
import {expect} from 'chai'
import FieldMissingError from "./FieldMissingError";

describe('FieldMissingError', () => {

    it('Should be instance of Error', () => {
        const fieldMissingError = new FieldMissingError();

        expect(fieldMissingError).to.be.instanceOf(Error);
        expect(fieldMissingError).to.be.instanceOf(FieldMissingError);
        expect(fieldMissingError.code).to.be.equals(422);
    });

    it('Should customize message', () => {
        const customizeMessage = 'Customized message';
        const fieldMissingError = new FieldMissingError([], customizeMessage);

        expect(fieldMissingError.message).to.be.equals(customizeMessage);
    });

    it('Should keep fields', () => {
        const customizeFields = {zoo: 8, foo: 1, bar: 2};
        const fieldMissingError = new FieldMissingError(customizeFields);

        expect(fieldMissingError.fields).to.be.instanceOf(Array);
        expect(fieldMissingError.fields.sort()).to.be.eqls(Object.keys(customizeFields).sort());
    });

});