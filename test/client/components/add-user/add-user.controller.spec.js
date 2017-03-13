(function () {
    'use strict';

    var $location,
        $controller,
        AddUserController,
        thereIsAnError,
        status,
        UserService,
        SessionService,
        user;

    describe('AddUser Controller', function () {
        
        beforeEach(function () {
            module('app.user');
        });

        UserService = {
            save: function(user) {
                return {
                    $promise: {
                        then: function(success, error) {
                            if(!thereIsAnError){
                                return success({user: {}})
                            }
                            return error({data: 'error'});
                        }
                    }
                }
            }
        };
        
        SessionService = {
            setAuthSession: function() {}
        };

        beforeEach(inject(function (_$controller_, _$location_) {
            $controller = _$controller_;
            $location = _$location_;
            AddUserController = $controller('AddUserController', {
                UserService: UserService,
                $location: $location,
                SessionService: SessionService,
                user: user,
                status: status
            });
            thereIsAnError = false;
        }));

        it("should be defined", function () {
            expect(AddUserController).toBeDefined();
        });

        it('should be true when call the function validate', function() {
            var mockAttributeForm = {
                $invalid: true
            };
            var result = AddUserController.validate(mockAttributeForm);
            expect(result).toBe(true);
        });

        it('should call to path function of location when the user has been saved', function() {
            spyOn($location, 'path');
            AddUserController.addUser();
            expect($location.path).toHaveBeenCalled();
            expect($location.path).toHaveBeenCalledWith('/todoList');
        });

        it('should change the status value when occurs an error', function() {
            thereIsAnError = true;
            AddUserController.addUser();
            expect(AddUserController.status).toBe('error');
        });

    });
})();