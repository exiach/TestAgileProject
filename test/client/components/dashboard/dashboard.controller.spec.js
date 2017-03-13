(function () {
    'use strict';

    describe('Dashboard Controller', function () {
        var $controller;
        var DashboardController;

        var projectService = {
            query: function() {
                return {
                    $promise: {
                        then: function (onSuccess, onError) {}
                    }
                }
            }
        };
        var location = {
            path: function(path) {}
        };

        beforeEach(function () {
            module('app.dashboard');
        });

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
            DashboardController = $controller('DashboardController', {
                ProjectService: projectService,
                $location: location,
                projects: []
            });
        }));

        it("should be defined", function () {
            expect(DashboardController).toBeDefined();
        });
    });
})();