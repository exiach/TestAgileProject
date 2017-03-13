(function () {
    'use strict';

    angular
        .module('app.userStory')
        .constant('USER_STORY_TYPES', ['Bug', 'Feature', 'Spike', 'Dev Ops'])
        .constant('FIBONACCI_POINT_LIST', [0, 1, 2, 3, 5, 8, 13]);
})();