(function () {
    'use strict';

    angular
        .module('app.project')
        .service('ProjectService', ProjectService);

    ProjectService.$inject = [
        '$resource',
        'BASE_URL',
        'PROJECT'
    ];

    function ProjectService($resource, BASE_URL, PROJECT) {
        return $resource(BASE_URL + PROJECT, {}, {
            get: {
                method: 'GET'
            },
            save: {
                method: 'POST'
            },
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
})();