(function () {
    'use strict';

    var isSuccessResponse,
        addProjectCtrl,
        projectService,
        location,
        project;

    describe('AddProjectController', function () {

        projectService = {
            save: function() {
                return {
                    $promise: {
                        then: function (onSuccess, onError) {
                            if(isSuccessResponse) {
                                onSuccess({});
                            } else {
                                onError({});
                            }
                        }
                    }
                }
            }
        };
        
        location = {
            path: function() {}
        };

        beforeEach(module('app.addProject'));

        beforeEach(inject(function ($controller) {
            addProjectCtrl = $controller('AddProjectController', {
                ProjectService: projectService,
                $location: location,
                newProject: project,
                status: ''
            });
            isSuccessResponse = true;
        }));

        it('Should be defined the controller AddProjectController', function () {
            expect(addProjectCtrl).toBeDefined()
        });

        it('Should call to path function of $location', function () {
            spyOn(location, 'path');
            addProjectCtrl.saveProject();
            expect(location.path).toHaveBeenCalledWith('/project/undefined');
        });

        it('Should set the status value', function () {
            spyOn(console, 'error');
            isSuccessResponse = false;
            addProjectCtrl.saveProject();
            expect(console.error).toHaveBeenCalled();
        });
    });
})();