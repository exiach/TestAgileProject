(function () {
    'use strict';

    var modules = [
        'ngNewRouter',
        'ngResource',
        'ngCookies',
        'pascalprecht.translate',
        'app.todoList',
        'app.dashboard',
        'app.addProject',
        'app.project',
        'app.addUserStory',
        'app.userStory',
        'app.profile',
        'app.notification',
        'app.settings',
        'app.login',
        'app.user',
        'commons.interceptors',
        'app.session'
    ];

    angular
        .module('AgileTracker', modules);
})();
