(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('projectRow', function () {
            return {
                replace: true,
                restrict: 'A',
                templateUrl: 'components/dashboard/project-row/project-row.html'
            };
        });
})();
