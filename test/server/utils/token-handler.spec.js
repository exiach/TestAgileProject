var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    tokenHandler,
    jwt,
    cryptoHandler,
    expiredDate,
    token,
    accessToken;

describe('Token Handler', function () {

    jwt = {
        sign: function() {},
        decode: function() {}
    };

    cryptoHandler = {
        encrypt: function() {}
    };

    expiredDate = new Date(2132131000);

    token = {
        exp: 2132131
    };

    accessToken = 'slk6wio4er123Et3Dwh';

    beforeEach(function() {
        tokenHandler = proxyquire('../../../src/server/utils/token-handler.js', {
            'jsonwebtoken': jwt,
            '../utils/crypto-handler.js': cryptoHandler
        });
    });

    describe('create', function () {
        it('should return token object created', function () {
            spyOn(jwt, 'sign').and.returnValue(accessToken);
            spyOn(jwt, 'decode').and.returnValue(token);
            spyOn(cryptoHandler, 'encrypt').and.returnValue(accessToken);
            var tokenResult = tokenHandler.create();
            expect(tokenResult.auth.accessToken).toBe('slk6wio4er123Et3Dwh');
            expect(tokenResult.auth.expiredDate.getTime()).toBe(expiredDate.getTime());
        });
    });

});