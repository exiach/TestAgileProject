(function () {
    'use strict';
    angular
        .module('app.project')
        .directive('storiesList', storiesList);

    function storiesList() {

        function linker (scope, element, attrs) {
            var contextualClasses = {
                Backlog: 'info',
                Current: 'warning',
                Done: 'success'
            };
            scope.status = attrs.status;
            scope.context = contextualClasses[attrs.status];
        }

        return {
            restrict: 'E',
            scope: {
                stories: '='
            },
            templateUrl: 'components/project/stories-list/stories-list.html',
            link: linker
        };
    }
})();