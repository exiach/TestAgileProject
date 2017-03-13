(function () {
    'use strict';

    angular.module('app.session', [])
        .factory('SessionService', SessionService);

    SessionService.$inject = ['$cookies'];

    function SessionService($cookies) {
        var service = {
            getAuthSession: getAuthSession,
            setAuthSession: setAuthSession,
            removeAuthSession: removeAuthSession,
            isExpiredDate: isExpiredDate
        };

        function getAuthSession() {
            var auth = $cookies.get('authSession');
            if (auth) {
                auth = angular.fromJson(auth);
            }
            return auth;
        }

        function setAuthSession(auth) {
            $cookies.put('authSession', angular.toJson(auth));
        }

        function removeAuthSession() {
            $cookies.remove('authSession');
        }

        function isExpiredDate() {
            var auth = $cookies.get('authSession') || false;
            var result = false;
            if (auth) {
                auth = angular.fromJson(auth);
            }
            var expireDate = new Date(auth.expiredDate);
            var currentDate = new Date();
            if(expireDate.getTime() < currentDate.getTime()) {
                result = true;
            }
            return result;
        }

        return service;
    }

})();