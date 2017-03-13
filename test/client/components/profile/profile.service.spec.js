(function () {
    'use strict';

    describe('ProfileService', function () {

        var $httpBackend = {};
        var profileService;
        var profile = {
            id: 1,
            firstName: 'Carledriss',
            lastName: 'Zeiss',
            initials: 'CZ',
            gender: 'male',
            birthday: '12/01/2015',
            email: 'carledriss@gmail.com',
            password: 'p@ssw0rd'
        };

        beforeEach(function () {
            module('ngResource');
            module('app.profile');
        });

        beforeEach(inject(function (_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            profileService = _$injector_.get('ProfileService');
        }));

        it('Should be defined the service ProfileService', function () {
            expect(profileService).toBeDefined()
        });

        it('Should get the object profile when execute the function get', function () {
            $httpBackend.expectGET('/users/1')
                .respond(200);

            profileService.get()
                .$promise.then(function (data) {
                    expect(data.firstName).toBe(profile.firstName);
                    expect(data.lastName).toBe(profile.lastName);
                    expect(data.initials).toBe(profile.initials);
                    expect(data.email).toBe(profile.email);
                    expect(data.password).toBe(profile.password);
                });
        });

        it('Should update the object profile when execute the function update', function () {
            var fakeProfile = {
                id: 1,
                firstName: 'Carledriss1',
                lastName: 'Zeiss1',
                initials: 'CZ1',
                gender: 'male',
                birthday: new Date('12/01/2015'),
                email: 'carledriss1@gmail.com',
                password: 'p@ssw0rd'
            };
            $httpBackend.expectPUT('/users/1')
                .respond(200, fakeProfile);

            profileService.update(fakeProfile)
                .$promise.then(function (data) {
                    expect(data.status).toBe(200);
                });
        });
    });
})();
