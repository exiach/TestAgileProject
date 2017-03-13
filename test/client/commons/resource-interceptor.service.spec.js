(function () {
    'use strict';

    var ResourceInterceptorService,
        SessionService,
        SessionServiceMock,
        authSession,
        response,
        emptyResponse,
        location,
        errorResponse;

    describe('Resource Interceptor service', function() {

        authSession = {
            accessToken: 'UHUAhduiqwjkhuWUhddh',
            refreshToken: 'AhduHUhdUiUqwjkhuWdh',
            expiredDate: new Date()
        };

        response = {
            data: {
                auth: {
                    accessToken: 'dhUHiqkhwjUAhduUhduW',
                    refreshToken: 'qwdhAhdUiUjkWdhuHUuh',
                    expiredDate: new Date()
                }
            }
        };

        emptyResponse = {
            data: {}
        };

        errorResponse = {
            status: 403
        };

        SessionServiceMock = function() {
            this.getAuthSession = function () {
                return authSession;
            };
            this.isExpiredDate = function() {};
            this.setAuthSession = function() {};
        };

        beforeEach(module('commons.interceptors'));

        beforeEach(module(function ($provide) {
            $provide.service('SessionService', SessionServiceMock);
        }));

        beforeEach(inject(function($injector) {
            ResourceInterceptorService = $injector.get('ResourceInterceptorService');
            SessionService = $injector.get('SessionService');
            location = $injector.get('$location');
        }));

        it('Resource Interceptor service is defined', function() {
            expect(ResourceInterceptorService).toBeDefined();
        });

        it('should not place a token in the http request headers if no token is set', function() {
            spyOn(SessionService, 'getAuthSession').and.returnValue(undefined);
            var config = ResourceInterceptorService.request({headers: {} });
            expect(config.headers['Authorization']).toBeUndefined();
        });

        it('should place the access token in the http request headers when has not expired date', function() {
            spyOn(SessionService, 'isExpiredDate').and.returnValue(false);
            var config = ResourceInterceptorService.request({headers: {} });
            expect(config.headers['Authorization']).toBe('bearer UHUAhduiqwjkhuWUhddh');
        });

        it('should place the refresh token in the http request headers when has expired date', function() {
            spyOn(SessionService, 'isExpiredDate').and.returnValue(true);
            var config = ResourceInterceptorService.request({headers: {} });
            expect(config.headers['Authorization']).toBe('bearer AhduHUhdUiUqwjkhuWdh');
        });

        it('should call to setAuthSession function when the response contains a new auth object', function() {
            spyOn(SessionService, 'setAuthSession');
            ResourceInterceptorService.response(response);
            expect(SessionService.setAuthSession).toHaveBeenCalled();
            expect(SessionService.setAuthSession).toHaveBeenCalledWith(response.data.auth);
        });

        it('should not call to setAuthSession function when the response does not contains a new auth object', function() {
            spyOn(SessionService, 'setAuthSession');
            ResourceInterceptorService.response(emptyResponse);
            expect(SessionService.setAuthSession).not.toHaveBeenCalled();
        });

        it('should call to path function of location when the response contains an error with status code 403', function() {
            spyOn(location, 'path');
            ResourceInterceptorService.responseError(errorResponse);
            expect(location.path).toHaveBeenCalled();
            expect(location.path).toHaveBeenCalledWith('/');
        });

    });

})();