var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('Crypto Handler', function () {


    var cryptoHanddler,

        cipher = {
            update: function(){},
            final: function(){}
        },
        mockCrypto = {
            createCipher: function () {},
            createDecipher: function () {}
        };


    beforeEach(function() {
        cryptoHanddler = proxyquire('../../../src/server/utils/crypto-handler.js', {
            'crypto': mockCrypto
        });
    });

    describe('encrypt', function () {
        it('should return password encrypted', function () {
            spyOn(mockCrypto, 'createCipher').and.returnValue(cipher);
            spyOn(cipher, 'update').and.returnValue('hello');
            spyOn(cipher, 'final').and.returnValue('world');
            var result = cryptoHanddler.encrypt();
            expect(result).toBe('helloworld');
        });
    });

    describe('decrypt', function () {
        it('should return password decrypted', function () {
            spyOn(mockCrypto, 'createDecipher').and.returnValue(cipher);
            spyOn(cipher, 'update').and.returnValue('world');
            spyOn(cipher, 'final').and.returnValue('hello');
            var result = cryptoHanddler.decrypt();
            expect(result).toBe('worldhello');
        });
    });

});
