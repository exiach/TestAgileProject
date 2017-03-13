(function () {
    'use strict';
    angular
        .module('app.profile', [])
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ProfileService'];

    function ProfileController(ProfileService) {
        var vm = this;
        vm.userProfile = {
            firstName: '',
            lastName: '',
            initials: '',
            gender: '',
            birthday: '',
            email: '',
            password: ''
        };
        vm.get = get;
        vm.update = update;
        vm.enableFields = false;

        function get() {
            ProfileService.get({profileId: 1})
                .$promise.then(onSuccess);

            function onSuccess(res) {
                vm.userProfile = res;
                console.log(vm.userProfile);
            }
        }

        function update() {
            ProfileService.update(vm.userProfile)
                .$promise.then(onSuccess);

            function onSuccess(data) {
                console.log(data);
            }
        }

        vm.get();
    }
})();