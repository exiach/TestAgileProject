(function () {
    'use strict';

    angular
        .module('app.addProject', [])
        .controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = [
        '$location',
        'ProjectService'
    ];

    function AddProjectController($location, ProjectService) {

        var vm = this;
        vm.newProject = {};
        vm.currentDate = new Date();
        vm.saveProject = saveProject;

        function saveProject() {
            ProjectService.save(vm.newProject)
                .$promise.then(onSuccess, onError);

            function onSuccess(response) {
                $location.path('/project/' + response._id);
            }

            function onError(error) {
                console.error(error);
            }
        }
    }
})();