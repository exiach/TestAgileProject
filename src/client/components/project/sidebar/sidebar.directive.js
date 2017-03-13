(function () {
    'use strict';

    angular
        .module('app.project')
        .directive('sidebar', sidebar);

    function sidebar() {
        return {
            transclude: true,
            replace: true,
            restrict: 'E',
            templateUrl: 'components/project/sidebar/sidebar.html'
        };
    }
})();