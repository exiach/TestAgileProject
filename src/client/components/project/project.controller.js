(function () {
    'use strict';

    angular
        .module('app.project', [])
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = [
        '$location',
        '$routeParams',
        'ProjectService',
        'UserStoryService',
        'STATUS'
    ];

    function ProjectController($location,
                               $routeParams,
                               ProjectService,
                               UserStoryService,
                               STATUS) {
        var vm = this;
        vm.currentProject = {};
        vm.projectId = $routeParams.projectId;
        vm.userStories = [];
        vm.status = STATUS;
        vm.goToUS = function () {
            $location.path('/project/' + vm.projectId + '/addUserStory');
        };

        function getProject(projectId) {
            return ProjectService.get(projectId)
                .$promise.then(onSuccess);

            function onSuccess(res) {
                vm.currentProject = res;
            }
        }

        function getUserStories(projectId) {
            return UserStoryService.query(projectId)
                .$promise.then(onSuccess);

            function onSuccess(res) {
                vm.userStories = res;
            }
        }

        getProject({_id: vm.projectId});
        getUserStories({projectId: vm.projectId});
    }
})();