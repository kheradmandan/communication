import {describe} from "mocha"
import {expect} from 'chai'
import protection from "./protection";

describe('Protection middleware', () => {
    let req, res, next;
    beforeEach(() => {
        res = {};
        req = {};
        next = () => null;
    });

    it('Should prevent unauthorized request', () => {
        req.user = undefined;
        expect(() => protection(req, res, next)).to.throw();

        req.user = {};
        expect(() => protection(req, res, next)).to.throw();

        req.user = {uuid: null};
        expect(() => protection(req, res, next)).to.throw();
    });

    it('Should allow pass request', () => {
        let passed = false;
        next = () => passed = true;
        req.user = {uuid: 'some uuid value'};

        protection(req, res, next);
        expect(passed).to.be.true;
    });
});