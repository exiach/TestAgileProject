(function () {
    'use strict';

    var AddUserStoryController,
        mockUserStoryService,
        mockTypes,
        mockPointList,
        location;

    describe('AddUserStoryController', function() {

        mockUserStoryService = {
            save: function() {
                return {
                    $promise: {
                        then: function (data, onError) {
                            data({status: 200});
                        }
                    }
                }
            }
        };

        mockTypes = [ 'Bug', 'Feature', 'Spike', 'Dev Ops' ];
        
        mockPointList = [ 0, 1, 2, 3, 5 ];
        
        location = {
            path: function () {}
        };

        var routeParams = {};

        beforeEach(module('app.addUserStory'));

        beforeEach(inject(function (_$controller_) {

            spyOn(mockUserStoryService, 'save').and.callThrough();
            spyOn(location, 'path');

            AddUserStoryController = _$controller_('AddUserStoryController', {
                $location: location,
                $routeParams: routeParams,
                UserStoryService: mockUserStoryService,
                FIBONACCI_POINT_LIST: mockPointList,
                USER_STORY_TYPES: mockTypes
            });

        }));

        it('Should be defined the controller AddUserStoryController', function () {
            expect(AddUserStoryController).toBeDefined()
        });

        it('Should call the function save when execute the function createUserStory', function () {
            AddUserStoryController.userStory = {
                title: 'create users',
                description: 'The user should be able to create users',
                type: 'feature',
                points: 8,
                status: 'Backlog',
                projectId: 1
            };
            AddUserStoryController.createUserStory();
            expect(mockUserStoryService.save).toHaveBeenCalled();
        });

        it('Should call to path function of $location', function () {
            AddUserStoryController.createUserStory();
            expect(location.path).toHaveBeenCalledWith('/project/undefined');
        });

        it('Should be the array equals', function () {
            var expectArray = [0, 1, 2, 3, 5];
            var resultArray = AddUserStoryController.points;
            expect(resultArray).toEqual(expectArray);
        });

        it('Should container types of user stories equal to expectArray', function () {
            var resultArray = AddUserStoryController.types;
            var expectArray = ['Bug', 'Feature', 'Spike', 'Dev Ops'];
            expect(resultArray).toEqual(expectArray);
        });

    });
})();