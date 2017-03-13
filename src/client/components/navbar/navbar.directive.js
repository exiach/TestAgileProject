(function () {
    'use strict';

    angular
        .module('AgileTracker')
        .directive('navbar', navbar);

    function navbar() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html'
        };
    }
})();
