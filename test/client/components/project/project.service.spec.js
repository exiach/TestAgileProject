(function () {
    'use strict';

    describe('ProjectService', function () {

        var $httpBackend = {};
        var projectService;
        var project = {
            title: 'Agile Tracker',
            description: '',
            startDate: new Date(),
            iterationLength: 3,
            projectId: 1
        };
        var PROJECT = '/project/1';
        var BASE_URL = 'http://localhost:3000';

        var projectList = [project];

        beforeEach(function () {
            module('ngResource');
            module('app.project');
        });

        beforeEach(module(function ($provide) {
            $provide.constant('BASE_URL', BASE_URL);
            $provide.constant('PROJECT', PROJECT);
        }));

        beforeEach(angular.mock.inject(function (_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            projectService = _$injector_.get('ProjectService');
        }));

        it('Should be defined the service ProjectService', function () {
            expect(projectService).toBeDefined()
        });

        it('Should get the object project when execute the function get', function () {
            $httpBackend.expectGET(BASE_URL + PROJECT)
                .respond(200);
            projectService.get()
                .$promise.then(function (data) {
                    expect(data.title).toBe(project.title);
                    expect(data.description).toBe(project.description);
                    expect(data.startDate).toBe(project.startDate);
                    expect(data.iterationLength).toBe(project.iterationLength);
                });
        });

        it('Should receive to object project when execute the function save', function () {
            $httpBackend.expectPOST(BASE_URL + PROJECT)
                .respond(200, project);
            projectService.save(project)
                .$promise.then(function (data) {
                    expect(data.status).toBe(200);
                });
        });

        it('Should retrieve project List when execute the function query', function () {
            $httpBackend.expectGET('/project')
                .respond(200, projectList);
            projectService.query();
        });
    });
})();