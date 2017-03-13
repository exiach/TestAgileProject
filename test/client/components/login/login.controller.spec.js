(function () {
    'use strict';

    var $controller,
        $location,
        LoginController,
        thereIsAnError,
        AuthenticationService,
        SessionService;

    describe('Login Controller Tests', function () {

        beforeEach(function () {
            module('app.login');
        });

        AuthenticationService = {
            login: function(user) {
                return {
                    $promise: {
                        then: function(success, error) {
                            if(!thereIsAnError) {
                                return success({user: {}})
                            }
                            return error({data: 'error'});
                        }
                    }
                }
            }
        };

        SessionService = {
            setUserSession: function() {}
        };

        beforeEach(inject(function (_$controller_, _$location_) {
            $controller = _$controller_;
            $location = _$location_;
            LoginController = $controller('LoginController', {
                AuthenticationService: AuthenticationService,
                SessionService: SessionService,
                $location: $location
            });
            thereIsAnError = false;
        }));

        it("should be defined", function () {
            expect(LoginController).toBeDefined();
        });

        it('should call to session service when the authentication service returns a user', function() {
            spyOn($location, 'path');
            LoginController.login();
            expect($location.path).toHaveBeenCalled();
            expect($location.path).toHaveBeenCalledWith('/todoList');
        });

        it('should change the status value when occurs an error', function() {
            thereIsAnError = true;
            LoginController.login();
            expect(LoginController.status).toBe('error');
        });
    });
})();
