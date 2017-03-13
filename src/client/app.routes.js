(function () {
    'use strict';
    angular
        .module('AgileTracker')
        .controller('AgileTrackerController', AgileTrackerController);

    AgileTrackerController.$inject = ['$router'];

    function AgileTrackerController($router) {
        $router.config([
            {path: '/', redirectTo: '/login'},
            {path: '/login', component: 'login'},
            {path: '/dashboard', component: 'dashboard'},
            {path: '/addUser', component: 'addUser'},
            {path: '/profile', component: 'profile'},
            {path: '/settings', component: 'settings'},
            {path: '/addProject', component: 'addProject'},
            {path: '/project/:projectId', component: 'project'},
            {path: '/project/:projectId/addUserStory', component: 'addUserStory'},
            {path: '/todoList', component: 'todoList'}
        ]);
    }
})();