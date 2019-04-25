import {describe} from 'mocha'
import {expect} from 'chai'
import ForbiddenError from "../errors/ForbiddenError";
import sterilization from "./sterilization";

describe('Sterilization middleware', () => {
    let req, res, next;
    beforeEach(() => {
        res = {};
        req = {};
        next = () => null;
    });

    it('Should handle inner errors', () => {
        const innerError = new ForbiddenError();
        let status = 0;
        let result = {};
        res.status = (no) => (status = no) && res;
        res.json = (data) => result = data;

        sterilization(innerError, req, res, next);
        expect(status).to.equals(innerError.code);
        expect(result.error.message).to.equals(innerError.message);
    });

    it('Should not handle outer errors', () => {
        const outerError = new Error();
        let passedToNext = false;
        next = () => passedToNext = true;

        sterilization(outerError, req, res, next);
        expect(passedToNext).to.be.true;
    });
});