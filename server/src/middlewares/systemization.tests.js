import {describe} from 'mocha'
import {expect} from 'chai'
import systemization from "./systemization";

describe('Systemization Middleware', () => {
    let req, res, next, nextCalled = false;
    beforeEach(() => {
        res = {locals: {}};
        req = {};
        next = () => nextCalled = true;
    });

    it('Should pass all errors as error response', () => {
        const error = new Error('My message');

        systemization(error, req, res, next);
        expect(nextCalled).to.be.true;
        expect(res.locals.type).to.equals('error');
        expect(res.locals.status).to.equals(error.code);
        expect(res.locals.payload.message).to.equals(error.message);
    });

});