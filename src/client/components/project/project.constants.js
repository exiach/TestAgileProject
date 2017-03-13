(function () {
    'use strict';

    angular
        .module('app.project')
        .constant('STATUS', {
            DONE: 'Done',
            CURRENT: 'Current',
            BACKLOG: 'Backlog'
        });
})();