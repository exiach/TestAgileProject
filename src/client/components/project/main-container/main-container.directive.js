(function () {
    'use strict';

    angular
        .module('app.project')
        .directive('mainContainer', mainContainer);

    function mainContainer() {
        return {
            transclude: true,
            replace: true,
            restrict: 'E',
            templateUrl: 'components/project/main-container/main-container.html'
        };
    }
})();
