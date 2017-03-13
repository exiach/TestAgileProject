(function () {
    'use strict';

    describe('UserService', function () {
        var $httpBackend = {};
        var UserService;

        var user = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@gmail.com',
            password: 'qwe123asd',
            birthday: '12/05/1989',
            gender: 'male'
        };

        beforeEach(function () {
            module('ngResource');
            module('app.user');
            module(function ($provide) {
                $provide.constant('BASE_URL', 'https://localhost:3000');
            })
        });

        beforeEach(angular.mock.inject(function (_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            UserService = _$injector_.get('UserService');
        }));

        it('Should be defined', function () {
            expect(UserService).toBeDefined()
        });

        it('Should receive an user object when the function save is executed', function () {
            $httpBackend.expectPOST('/users')
                .respond(200, user);
            UserService.save(user);
        });
    });
})();