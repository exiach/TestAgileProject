(function () {
    'use strict';

    describe('UserStoryService', function () {

        var userStoryService = {};
        var $httpBackend = {};
        var USER_STORY = '/project/1/user-story';

        beforeEach(function () {
            module('ngResource');
            module('app.userStory');
        });

        beforeEach(module(function ($provide) {
            $provide.constant('USER_STORY', USER_STORY);
        }));

        beforeEach(inject(function (_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            userStoryService = _$injector_.get('UserStoryService');
        }));

        it('should be defined', function () {
            expect(userStoryService).toBeDefined();
        });

        it('should receive to object userStory when execute the function save', function () {
            var fakeUserStory = {
                title: 'Create users',
                description: 'The user should be able to create users',
                type: 'Feature',
                points: 8,
                status: 'Backlog',
                projectId: 1
            };

            $httpBackend.expectPOST(USER_STORY)
                .respond(200, fakeUserStory);

            userStoryService.save(fakeUserStory)
                .$promise.then(function (data) {
                    expect(data.title).toBe(fakeUserStory.title);
                    expect(data.description).toBe(fakeUserStory.description);
                    expect(data.type).toBe(fakeUserStory.type);
                    expect(data.points).toBe(fakeUserStory.points);
                    expect(data.status).toBe(fakeUserStory.status);
                    expect(data.projectId).toBe(fakeUserStory.projectId);
                });

            $httpBackend.flush();
        });
    });
})();