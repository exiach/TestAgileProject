var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    USER_EXIST = 'User already exist.',
    INTERNAL_SERVER_ERROR = 'Internal server error',
    userController,
    userObj,
    response,
    userModelMock,
    tokenHandlerMock,
    token,
    responseObj,
    userResponse;

describe('User Controller', function () {

    userModelMock = {
        create: function () {},
        find: function () {},
        findById: function () {},
        findByIdAndRemove: function () {},
        findOneAndUpdate: function () {},
        findOne: function () {}
    };

    tokenHandlerMock = {
        create: function() {}
    };

    beforeEach(function() {
        userController = proxyquire('../../../src/server/controllers/users.js', {
            '../models/user.js': userModelMock,
            '../utils/token-handler.js': tokenHandlerMock
        });

        token = {
            toJson: function() {}
        };

        response = {
            status: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            }),
            sendStatus: jasmine.createSpy('responseSpy'),
            send: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            })
        };

        userObj= {
            '_id': 11111,
            'password': '123456',
            'birthday': '1990-10-15',
            'email': 'test@test.com',
            'gender': 'male',
            'firstName': 'name',
            'lastName': 'last name'
        };


        responseObj = {
            '_id': 11111,
            'password': '123456',
            'birthday': '1990-10-15',
            'email': 'test@test.com',
            'gender': 'male',
            'firstName': 'name',
            'lastName': 'last name'
        };

        userResponse = {
            'id': 11111,
            'email': 'test@test.com',
            'firstName': 'name'
        };
    });

    describe('save', function () {
        it('should return the created token from the database', function (done) {

            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve(undefined));
            spyOn(userModelMock, 'create').and.returnValue(Q.resolve(userObj));
            userController.save({
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(responseObj);
                done();
            });
        });

        it('should return error when exists a user with the same email', function (done) {

            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve({}));

            userController.save({
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(USER_EXIST);
                done();
            });
        });

        it('should return error internal error when occurs an error', function (done) {

            spyOn(userModelMock, 'findOne').and.returnValue(Q.reject({}));

            userController.save({
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
                done();
            });
        });
    });

    describe('getAll', function () {
        it('should return all the users from the database', function (done) {
            var users = [
                {
                    firstName: 'New',
                    lastName: 'New',
                    password: 'Control',
                    email: 'email@gmail.com',
                    gender: 'male'
                },
                {
                    firstName: 'New1',
                    lastName: 'New1',
                    password: 'Control1',
                    email: 'email1@gmail.com',
                    gender: 'female'
                }
            ];

            spyOn(userModelMock, 'find').and.returnValue(Q.resolve(users));

            userController.getAll({}, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(users);
                done();
            });
        });

        it('should return a 404 status code when no users are found', function (done) {
            spyOn(userModelMock, 'find').and.returnValue(Q.resolve([]));

            userController.getAll({}, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });

        it('should return error internal error when occurs an error', function (done) {
            spyOn(userModelMock, 'find').and.returnValue(Q.reject([]));

            userController.getAll({}, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
                done();
            });
        });
    });

    describe('getOne', function () {
        it('should return one user from the database', function (done) {

            spyOn(userModelMock, 'findById').and.returnValue(Q.resolve(userObj));

            userController.getOne({
                params: {
                    userId: 11111
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(userObj);
                done();
            });
        });

        it('should return a 404 status code when the user is not found', function (done) {
            spyOn(userModelMock, 'findById').and.returnValue(Q.resolve([]));

            userController.getOne({
                params: {
                    userId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });

        it('should return error internal error when occurs an error', function (done) {
            spyOn(userModelMock, 'findById').and.returnValue(Q.reject([]));

            userController.getOne({
                params: {
                    userId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
                done();
            });
        });
    });

    describe('remove', function () {
        it('should remove one user from the database', function (done) {

            spyOn(userModelMock, 'findByIdAndRemove').and.returnValue(Q.resolve(userObj));

            userController.remove({
                params: {
                    userId: 11111
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(userObj);
                done();
            });
        });

        it('should return a 404 status code when the user is not found', function (done) {
            spyOn(userModelMock, 'findByIdAndRemove').and.returnValue(Q.resolve([]));

            userController.remove({
                params: {
                    userId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });

        it('should return error internal error when occurs an error', function (done) {
            spyOn(userModelMock, 'findByIdAndRemove').and.returnValue(Q.reject([]));

            userController.remove({
                params: {
                    userId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
                done();
            });
        });
    });

    describe('update', function () {
        it('should update one user from the database', function (done) {

            spyOn(userModelMock, 'findOneAndUpdate').and.returnValue(Q.resolve(userObj));

            userController.update({
                params: {
                    userId: 1
                },
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(userResponse);
                done();
            });
        });

        it('should return a 404 status code when the user is not found', function (done) {

            spyOn(userModelMock, 'findOneAndUpdate').and.returnValue(Q.resolve([]));

            userController.update({
                params: {
                    userId: 1
                },
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });

        it('should return error internal error when occurs an error', function (done) {

            spyOn(userModelMock, 'findOneAndUpdate').and.returnValue(Q.reject([]));

            userController.update({
                params: {
                    userId: 1
                },
                body: userObj
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
                done();
            });
        });
    });
});
