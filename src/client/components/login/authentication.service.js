(function () {
    'use strict';
    angular
        .module('app.login')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$resource', 'BASE_URL'];

    function AuthenticationService($resource, BASE_URL) {
        return $resource(BASE_URL + '/auth/login', {}, {
            login: {
                method: 'POST'
            }
        });
    }
})();
