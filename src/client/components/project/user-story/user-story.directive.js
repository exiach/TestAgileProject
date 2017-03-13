(function () {
    'use strict';
    angular
        .module('app.project')
        .directive('userStory', userStory);

    function userStory() {

        return {
            restrict: 'E',
            templateUrl: 'components/project/user-story/user-story.html'
        };
    }
})();