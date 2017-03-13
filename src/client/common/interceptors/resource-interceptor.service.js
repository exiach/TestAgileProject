(function () {
    'use strict';

    angular.module('commons.interceptors', [])
        .factory('ResourceInterceptorService', ResourceInterceptorService);

    ResourceInterceptorService.$inject = ['SessionService', '$location'];

    function ResourceInterceptorService(SessionService, $location) {
        return {
            request: function(request) {
                var authenticated = SessionService.getAuthSession();
                if (authenticated) {
                    if (SessionService.isExpiredDate()) {
                        request.headers['token-type'] = 'refresh';
                        request.headers['Authorization'] =  'bearer ' + authenticated.refreshToken;
                    } else {
                        request.headers['token-type'] = 'access';
                        request.headers['Authorization'] =  'bearer ' + authenticated.accessToken;
                    }
                }
                return request;
            },

            response: function(response) {
                var newAuth = response.data.auth || false;
                if (newAuth) {
                    SessionService.setAuthSession(newAuth);
                }
                return response;
            },

            responseError: function(error) {
                if(error.status === 403) {
                    $location.path('/');
                }
            }
        };
    }
})();