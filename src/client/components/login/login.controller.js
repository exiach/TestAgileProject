(function () {
    'use strict';

    angular
        .module('app.login', [])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];

    function LoginController($location, AuthenticationService) {
        var vm = this;
        vm.login = login;
        vm.email = '';
        vm.password = '';
        vm.status = '';

        function login() {
            AuthenticationService.login({}, {
                email: vm.email,
                password: vm.password
            }).$promise.then(function (response) {
                    $location.path('/dashboard');
                }, function (error) {
                    vm.status = 'Email or password are incorrect, try again!';
                });
        }
    }
})();
