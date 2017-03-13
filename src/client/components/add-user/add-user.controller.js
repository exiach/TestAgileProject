(function () {
    'use strict';

    angular
        .module('app.user', [])
        .controller('AddUserController', AddUserController);

    AddUserController.$inject = ['$location', 'UserService'];

    function AddUserController($location, UserService) {
        var vm = this;
        vm.addUser = addUser;
        vm.status = '';
        vm.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthday: '',
            gender: ''
        };
        vm.validate = validate;

        function validate(attributeForm) {
            return attributeForm.$invalid && !attributeForm.$pristine;
        }

        function addUser() {
            if (angular.isDefined(vm.user)) {
                UserService.save(vm.user).$promise.then(function (response) {
                    $location.path('/todoList');
                }, function (error) {
                    vm.status = error.data;
                });
            }
        }
    }
})();