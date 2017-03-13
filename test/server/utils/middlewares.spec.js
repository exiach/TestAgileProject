var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('MiddleWares', function () {
    var FORBIDDEN = 'Forbidden.';

    var middleware,
        response,
        request,
        next,
        tokenMock,
        token,
        tokenResponse,
        mockJwt = {
            verify: function () {},
            decode: function() {}
        },
        mockTokenHandle = {
            create: function() {}
        },
        mockCryptHandler = {
            decrypt: function() {}

        };


    beforeEach(function() {
        middleware = proxyquire('../../../src/server/utils/middlewares.js', {
            'jsonwebtoken': mockJwt,
            '../utils/crypto-handler.js': mockCryptHandler,
            '../utils/token-handler.js': mockTokenHandle
        });

        var expiredDate = new Date();

        response = {
            status: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            }),
            send: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            })
        };

        request = {
            header: function() {}
        };

        token = {
            accessToken: 'slkwioer123Et3Dwh',
            refreshToken: 'jgf4fd6CDyt43sdhj',
            expiredDate: expiredDate
        };

        tokenResponse = {
            accessToken: 'slkwioer123Et3Dwh',
            refreshToken: 'jgf4fd6CDyt43sdhj',
            expiredDate: expiredDate
        };
    });

    describe('validateToken', function () {
        it('should return error when authorization is undefined', function () {
            spyOn(request, 'header').and.returnValue(undefined);
            middleware.validateToken(request, response, next);
            expect(response.send).toHaveBeenCalled();
            expect(response.send).toHaveBeenCalledWith(FORBIDDEN);
        });

        it('should return error when the token_access is valid', function () {
            var error = {
                name: 'JsonWebTokenError'
            };
            spyOn(request, 'header').and.returnValue('access');
            spyOn(mockCryptHandler, 'decrypt').and.returnValue({});
            spyOn(mockJwt, 'verify').and.callFake(function() {
                throw error;
            });
            middleware.validateToken(request, response, next);
            expect(response.send).toHaveBeenCalled();
            expect(response.send).toHaveBeenCalledWith(FORBIDDEN);
        });

        it('should not return error when the token_access is Expired', function () {
            var error = {
                name: 'TokenExpiredError'
            };
            spyOn(request, 'header').and.returnValue('access');
            spyOn(mockCryptHandler, 'decrypt').and.returnValue({});
            spyOn(mockJwt, 'verify').and.callFake(function() {
                throw error;
            });
            middleware.validateToken(request, response, next);
            expect(response.send).not.toHaveBeenCalled();
            expect(response.send).not.toHaveBeenCalledWith(FORBIDDEN);
        });

        it('should not return error when the token_access is valid', function () {
            spyOn(request, 'header').and.returnValue('access');
            spyOn(mockCryptHandler, 'decrypt').and.returnValue({});
            spyOn(mockJwt, 'verify').and.returnValue({});
            middleware.validateToken(request, response, next);
            expect(response.send).not.toHaveBeenCalled();
            expect(response.send).not.toHaveBeenCalledWith(FORBIDDEN);
        });

        it('should return error when the token_refresh is valid', function () {
            spyOn(request, 'header').and.returnValue('refresh');
            spyOn(mockCryptHandler, 'decrypt').and.returnValue({});
            spyOn(mockJwt, 'verify').and.callFake(function() {
                throw 'some error';
            });
            middleware.validateToken(request, response, next);
            expect(response.send).toHaveBeenCalled();
            expect(response.send).toHaveBeenCalledWith(FORBIDDEN);
        });

        it('should create a token when the token_refresh is valid', function () {
            spyOn(request, 'header').and.returnValue('refresh');
            spyOn(mockCryptHandler, 'decrypt').and.returnValue({});
            spyOn(mockJwt, 'verify').and.returnValue({});
            spyOn(mockJwt, 'decode').and.returnValue({});
            spyOn(mockTokenHandle, 'create').and.returnValue(token);
            middleware.validateToken(request, response, next);
            expect(response.send).toHaveBeenCalled();
            expect(response.send).toHaveBeenCalledWith(tokenResponse);
        });
    });
});
