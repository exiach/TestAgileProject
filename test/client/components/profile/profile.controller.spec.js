(function () {
    'use strict';

    describe('ProfileController', function () {

        var profileController = {};
        var mockProfileService = {
            get: function () {
                return {
                    $promise: {
                        then: function (onSuccess, onError) {
                            onSuccess({status: 200});
                        }
                    }
                }
            },
            update: function (profile) {
                return {
                    $promise: {
                        then: function (onSuccess, onError) {
                            onSuccess({data: profile});
                        }
                    }
                }
            }
        };
        var profile = {
            profileId: 1,
            firstName: 'Carledriss',
            lastName: 'Zeiss',
            initials: 'CZ',
            gender: 'male',
            birthday: new Date('01/01/2001'),
            email: 'carledriss@gmail.com',
            password: 'p@ssw0rd'
        };


        beforeEach(module('app.profile'));

        beforeEach(inject(function (_$controller_) {
            spyOn(mockProfileService, 'get').and.callThrough();
            spyOn(mockProfileService, 'update').and.callThrough();

            profileController = _$controller_('ProfileController', {
                ProfileService: mockProfileService
            });
        }));

        it('Should be defined the controller ProfileController', function () {
            expect(profileController).toBeDefined()
        });

        it('Should call the get service function when executing the get function',
            function () {
                profileController.get();
                expect(mockProfileService.get).toHaveBeenCalled();
            });

        it('Should call the update service function when executing the update function',
            function () {
                profileController.update(profile);
                expect(mockProfileService.update).toHaveBeenCalled();
            });
    });
})();
