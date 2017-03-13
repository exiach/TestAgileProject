(function () {
    'use strict';

    describe('AuthenticationService', function () {
        var $httpBackend = {};
        var AuthenticationService;

        var login = {
            email: 'john@gmail.com',
            password: 'qwe123asd'
        };

        beforeEach(function () {
            module('ngResource');
            module('app.login');
            module(function ($provide) {
                $provide.constant('BASE_URL', 'https://localhost:3000');
            })
        });

        beforeEach(angular.mock.inject(function (_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            AuthenticationService = _$injector_.get('AuthenticationService');
        }));

        it('Should be defined', function () {
            expect(AuthenticationService).toBeDefined()
        });

        it('Should receive an user object when the function save is executed', function () {
            $httpBackend.expectPOST('/auth')
                .respond(200, login);
            AuthenticationService.login(login);
        });
    });
})();