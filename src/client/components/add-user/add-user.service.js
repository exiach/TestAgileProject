(function () {
    'use strict';
    angular
        .module('app.user')
        .factory('UserService', UserService);

    UserService.$inject = ['$resource', 'BASE_URL'];

    function UserService($resource, BASE_URL) {
        return $resource(BASE_URL + '/auth/signUp', {}, {
            save: {
                method: 'POST'
            }
        });
    }
})();