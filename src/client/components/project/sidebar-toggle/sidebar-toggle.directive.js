(function () {
    'use strict';

    angular
        .module('app.project')
        .directive('sidebarToggle', sidebarToggle);

    sidebarToggle.$inject = ['SidebarService'];

    function sidebarToggle(SidebarService) {

        var linker = function(scope, element, attrs) {
            scope.isOpen = false;
            scope.toggleSidebar = toggle;

            function toggle() {
                SidebarService.toggle();
                scope.isOpen = SidebarService.isOpen();
            }

            SidebarService.reset();
        };

        return {
            replace: true,
            restrict: 'AE',
            templateUrl: 'components/project/sidebar-toggle/sidebar-toggle.html',
            link: linker
        };
    }
})();