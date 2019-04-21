import {describe} from "mocha"
import {expect} from 'chai'
import authorization from './authorization'
import {sign} from "../core/tokenizator";

describe('Authorization Middleware', () => {
    const payload = {
        email: 'sample@example.com',
        nickname: 'Sample Nickname',
    };

    let req, res;
    beforeEach(() => {
        res = {};
        req = {get: () => undefined};
    });

    it('Should authorize', (done) => {
        sign(payload)
            .then(token => {
                req.get = () => 'jwt ' + token;
                authorization(req, res, () => {
                    expect(req.user).to.not.null;
                    expect(req.user).to.contains(payload);
                    expect(req.user.email).to.equals(payload.email);
                    expect(req.user.nickname).to.equals(payload.nickname);
                    done();
                });
            })
            .catch(err => {
                expect.fail(err);
                done()
            })
    });

    it('Should handle none token requests', (done) => {
        authorization(req, res, () => {
            expect(req.user).to.undefined;
            done();
        });
    });

    it('Should handle wrong token', (done) => {
        // wrong token. last (character) 'e' must be 'E'
        req.get = () => 'jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBsZUBleGFtcGxlLmNvbSIsIm5pY2tuYW1lIjoiU2FtcGxlIE5pY2tuYW1lIiwiaWF0IjoxNTU1ODUzNzg5LCJleHAiOjE1NTY0NTg1ODksImF1ZCI6Imh0dHA6Ly93d3cuc2FmYXJheWFuZWguY29tIiwiaXNzIjoiU2FmYXJheWFuZWggQ29tbXVuaWNhdGlvbiIsInN1YiI6IkF1dGhvcml6YXRpb24ga2V5In0.IErr7jIvP0xaBr0CplQ-_e71mjvxgnivhoqJXc1Ekr-V7BTmQh0hY6GpAeNxFlVMNMk8pD84raLm-6ddJmxlN9jtU_S1b86o0ljTl9Goaxy7DNLdN3Ka-fQyxKZnwcVdSCL4Q0yBokKJQT93xFdvc-ntBboQjK62uV1qIpa8wgKSFMGIqq3hZHEytw4UkrXEUawV8sQ5QaodqwfpaEJrLJmBaZ7-7xFSJlAaZvcnbQicSCoVpQrDltoh4ncfrhKgfuMRwmAnRflBr520YRbTgjFMMNsuWhDEms5_SGXw2q58Dybw0yI_FOmjluZNcAqx7J1sdGCSvtZV3c2nWG_9Wo0ZQFUs4ebwmJTcHORK2gPl71XZg00K3sf47rmUTsIz-smH38GABuu4IutBifqMdrjqRrid5uo1MpCD-yTu2hc5hiUeJ5Xr0Mkp_6Q6PDbKyGaDiLM-YvdB4hbiKqiQwJN-XYXcNUjXIxVREbL4ZMf5SLNIeTM5MVPMWACyxozYOiZkKt-ij5g3rBb5O5rE9SzAZehLxo4fCW3aeZe-wi8l48YC-QVGSSh-VyeS6X-bfjnin1LfBxVSQDRB9JiiHbpol0NnSvwgUKMXLQkKA7PV3EmOM5ACHfhbKzTmgNA5b_ubkX8ZtfQVa_e5MimXKbpTYaSWr8TZBhlHzcCKNCe';
        authorization(req, res, () => {
            expect(req.user).to.undefined;
            done();
        });
    })

});