(function () {
    'use strict';

    angular
        .module('app.settings', [])
        .controller('SettingsController', SettingsController);

    SettingsController.inject = [ '$translate' ];

    function SettingsController($translate) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        function changeLanguage(langKey) {
            $translate.use(langKey);
        }
    }
})();