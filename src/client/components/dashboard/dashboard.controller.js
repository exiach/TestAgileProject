(function () {
    'use strict';
    angular
        .module('app.dashboard', [])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        '$location',
        'ProjectService'
    ];

    function DashboardController($location,
                                 ProjectService) {

        var vm = this;
        vm.projects = [];

        vm.loadProjects = function () {
            ProjectService.query()
                .$promise.then(onSuccess, onError);

            function onSuccess(response) {
                vm.projects = response;
            }

            function onError(error) {
                console.error(error);
            }
        };

        vm.loadProjects();
    }
})();
