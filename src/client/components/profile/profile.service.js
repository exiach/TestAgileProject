(function () {
    'use strict';
    angular
        .module('app.profile')
        .service('ProfileService', ProfileService);

    ProfileService.$inject = ['$resource'];

    function ProfileService($resource) {
        // TODO commented until back-end is ready
        //return $resource('/users/:id', {id: '@id'}, {
        //    get: {method: 'GET'},
        //    update: {method: 'PUT'}
        //});
        var mockProfile = {
            id: 1,
            firstName: 'Carledriss',
            lastName: 'Zeiss',
            initials: 'CZ',
            gender: 'male',
            birthday: new Date('01/01/2001'),
            email: 'carledriss@gmail.com',
            password: 'p@ssw0rd'
        };
        var mockResource = {
            get: function () {
                return {
                    $promise: {
                        then: function(data, onError) {
                            data(mockProfile);
                        }
                    }
                };
            },
            update: function(profile) {
                return {
                    $promise: {
                        then: function(data, onError) {
                            data({status: 200});
                        }
                    }
                };
            }
        };
        return mockResource;
    }
})();