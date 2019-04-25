import {describe} from 'mocha'
import {expect} from 'chai'
import response from "./response";

describe('Response', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: (data) => data,
            status: () => res,
            link: {},
        };
    });

    it('Should do defaults', () => {
        const sender = response(req, res);
        expect(sender).to.be.instanceOf(Function);
    });

    it('Should send data', () => {
        let payloadThatSent = {};
        const payloadToSend = {my: 'name', is: 'morteza'};
        res.json = (payload) => payloadThatSent = payload;

        response(req, res)(payloadToSend);
        expect(payloadThatSent.data).to.deep.equals(payloadToSend);

        //and also
        response(req, res, {type: 'data'})(payloadToSend);
        expect(payloadThatSent.data).to.deep.equals(payloadToSend);

        //and also
        response(req, res)(payloadToSend, {type: 'data'});
        expect(payloadThatSent.data).to.deep.equals(payloadToSend);
    });

    it('Should send error', () => {
        let errorThatSent = {};
        const errorToSend = {message: 'My Spacial Situation Error'};
        res.json = (payload) => errorThatSent = payload;

        response(req, res, {type: 'error'})(errorToSend);
        expect(errorThatSent.error).to.deep.equals(errorToSend);
    });

    it('Should throw on undefined type', () => {
        expect(
            response(req, res, {type: 'specialWrapper'})
        ).to.throw();
    });

    it('Should send string', () => {
        let payloadThatSent = {};
        const payloadToSend = 'my name is morteza';
        res.json = (payload) => payloadThatSent = payload;

        response(req, res)(payloadToSend);
        expect(payloadThatSent.data).to.deep.equals({message: payloadToSend});
    });

    it('Should do send literals', () => {
        [
            null,
            undefined,
            1234,
            123.1,
            , // hole
        ]
            .forEach(payload => {
                let payloadThatSent = {};
                res.json = (payload) => payloadThatSent = payload;

                response(req, res)(payload);
                expect(payloadThatSent.data).to.deep.equals({});
            });
    });


    it('Should extend payload', () => {
        let payloadThatSent = {};
        const payloadToSend = {my: 'name', is: 'morteza'};
        const payloadToExtend = {my: 'family', is: 'raeisi', and: 'vanani'};
        res.json = (payload) => payloadThatSent = payload;

        response(req, res, {extend: payloadToExtend})(payloadToSend);
        expect(payloadThatSent.data).to.deep.equals({...payloadToSend, ...payloadToExtend});
    });

    it('Should add link', () => {
        const linksToAdd = [
            {link1: 'http://localhost/to/link/1'},
            {link2: 'http://localhost/to/link/2'},
        ];

        response(req, res, {link: linksToAdd})
        ('Some random data');
        expect(res.link).to.deep.equals(linksToAdd.reduce((state, x) => ({...state, ...x}), {}));
    });


});
