(function () {
    'use strict';

    angular
        .module('app.addUserStory', [])
        .controller('AddUserStoryController', AddUserStoryController);

    AddUserStoryController.$inject = [
        '$location',
        '$routeParams',
        'UserStoryService',
        'FIBONACCI_POINT_LIST',
        'USER_STORY_TYPES'
    ];

    function AddUserStoryController($location,
                                    $routeParams,
                                    UserStoryService,
                                    FIBONACCI_POINT_LIST,
                                    USER_STORY_TYPES) {
        var vm = this;
        vm.createUserStory = createUserStory;
        vm.newUserStory = {
            title: '',
            description: '',
            type: '',
            points: '',
            status: 'Backlog'
        };
        vm.points = FIBONACCI_POINT_LIST;
        vm.types = USER_STORY_TYPES;
        vm.projectId = $routeParams.projectId;

        function createUserStory() {
            UserStoryService.save({projectId: vm.projectId}, vm.newUserStory)
                .$promise.then(function (data) {
                    $location.path('/project/' + vm.projectId);
                }, function (error) {
                    console.error(error);
                });
        }
    }
})();