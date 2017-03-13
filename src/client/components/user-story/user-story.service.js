(function () {
    'use strict';

    angular
        .module('app.userStory')
        .service('UserStoryService', UserStoryService);

    UserStoryService.$inject = [
        '$resource',
        'USER_STORY'
    ];

    function UserStoryService($resource, USER_STORY) {
        return $resource(USER_STORY, {}, {
            save: {
                method: 'POST'
            },
            query: {
                method: 'GET', isArray: true
            }
        });
    }
})();