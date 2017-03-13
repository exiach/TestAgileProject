(function () {
    'use strict';

    describe('SettingsController', function () {

        var settingsController = {};
        var mockTranslate = {
            use: function () {}
        };

        beforeEach(module('app.settings'));
        beforeEach(inject(function (_$controller_) {
            settingsController = _$controller_('SettingsController', {
                $translate: mockTranslate
            });
        }));

        it ('SettingsController should be defined', function (){
            expect(settingsController).toBeDefined();
        });

        it ('Should call the function changeLanguage', function () {
            spyOn(mockTranslate, 'use');
            settingsController.changeLanguage('es');
            expect(mockTranslate.use).toHaveBeenCalled();
        });
    });

})();