(function () {
    'use strict';

    angular
        .module('app.project')
        .service('SidebarService', SidebarService);

    function SidebarService() {

        var TOGGLE_SIDEBAR_CLASS = 'open';

        var sidebar = $('#sidebar');
        var content = $('#main-content');

        var service = {
            open: setOpen,
            close: setClose,
            toggle: toggleSidebarStatus,
            isOpen: isOpen,
            reset: reset
        };

        function setOpen() {
            if (!isOpen()) {
                toggleSidebarStatus();
            }
        }

        function setClose() {
            if (isOpen()) {
                toggleSidebarStatus();
            }
        }

        function toggleSidebarStatus() {
            content.toggleClass(TOGGLE_SIDEBAR_CLASS);
            sidebar.toggleClass(TOGGLE_SIDEBAR_CLASS);
        }

        function isOpen() {
            return content.hasClass(TOGGLE_SIDEBAR_CLASS);
        }

        function reset() {
            sidebar.removeClass(TOGGLE_SIDEBAR_CLASS);
            content = $('#main-content');
        }

        return service;
    }
})();