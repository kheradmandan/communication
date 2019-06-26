const {describe} = require('mocha');
const {expect} = require('chai');
const {sign, verify} = require('./index');

describe('core/tokenizator', () => {

    const payload = {
        email: 'sample@example.com',
        nickname: 'Sample Nickname',
    };

    const jwtMeta = {
        aud: 'some audience',
        exp: 'some expiresOn ticks',
        iat: 'some real time ticks',
        iss: 'some issuer',
        sub: 'some subject'
    };

    it('Should sign payload', function shouldSign() {

            return sign(payload)
                .then((x) =>
                    expect(x).to.not.null
                );
        }
    );

    it('Should verify token', function shouldVerify() {

            return sign(payload)
                .then(verify)
                .then((x) =>
                    expect(x).to.keys({...payload, ...jwtMeta})
                );
        }
    );
});