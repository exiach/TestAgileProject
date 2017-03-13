(function () {
    'use strict';

    angular
        .module('AgileTracker')
        .constant('BASE_URL', 'http://localhost:3000')
        .constant('PROJECT', '/project/:_id')
        .constant('USER_STORY', '/project/:projectId/user-story');
})();
