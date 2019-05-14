import {describe} from 'mocha'
import {expect} from 'chai'
import ForbiddenError from "../errors/ForbiddenError";
import sterilization from "./sterilization";

describe('Sterilization middleware', () => {
    let req, res, next, nextCalled = false;
    beforeEach(() => {
        res = {locals: {}};
        req = {};
        next = () => nextCalled = true;
    });

    it('Should handle inner errors', () => {
        const innerError = new ForbiddenError();
        let status = 0;
        let result = {};
        res.status = (no) => (status = no) && res;
        res.json = (data) => result = data;

        sterilization(innerError, req, res, next);
        expect(nextCalled).to.be.true;
        expect(res.locals.type).to.equals('error');
        expect(res.locals.status).to.equals(innerError.code);
        expect(res.locals.payload.message).to.equals(innerError.message);
        expect(res.locals.payload.appendices).to.equals(innerError.appendices);
    });

    it('Should not handle outer errors', () => {
        const outerError = new Error();
        let passedToNext = undefined;
        next = (e) => passedToNext = e;

        sterilization(outerError, req, res, next);
        expect(passedToNext).to.deep.equals(passedToNext);
        expect(res.locals.payload).to.be.undefined;
    });
});