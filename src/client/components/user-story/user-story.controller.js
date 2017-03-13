(function () {
    'use strict';

    angular
        .module('app.userStory', [])
        .controller('UserStoryController', UserStoryController);

    UserStoryController.$inject = [
        'UserStoryService'
    ];

    function UserStoryController(UserStoryService) {

    }
})();