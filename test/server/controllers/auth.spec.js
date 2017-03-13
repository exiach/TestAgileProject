var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    INVALID_PASSWORD = 'Password incorrect, try again!',
    EMAIL_NOT_FOUND = 'User not found or email incorrect, try again!.',
    USER_EXIST = 'User already exist.',
    INTERNAL_SERVER_ERROR = 'Internal server error',
    token,
    authController,
    authObj,
    response,
    authToJson,
    responseObj,
    userModelMock,
    tokenHandlerMock,
    mailerMock,
    userObj;

describe('Login Controller', function () {
    beforeEach(function() {
        userModelMock = {
            create: function () {},
            find: function () {},
            findOne: function () {},
            findById: function () {},
            findByIdAndRemove: function () {},
            findByIdAndUpdate: function () {}
        };

        tokenHandlerMock = {
            create: function() {}
        };

        mailerMock = {
            sendSignUpUserNotification: function() {}
        };

        authController = proxyquire('../../../src/server/controllers/auth.js', {
            '../models/user.js': userModelMock,
            '../utils/token-handler.js': tokenHandlerMock,
            '../common/nodemailer': mailerMock
        });

        token = {
            toJson: function() {}
        };

        response = {
            status: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            }),
            send: jasmine.createSpy().and.callFake(function(msg) {
                return this;
            })
        };

        authObj= {
            'password': '123456',
            'email': 'test@test.com',
            toJson: function() {},
            validatePassword: function() {}
        };

        authToJson = {
            auth: {
                accessToken: '12AghfdSfcDEW76F4ashYT',
                refreshToken: 'dasdqwd32df23f234f3qa',
                expiredDate: new Date()
            }
        };

        responseObj = {
            auth: {
                accessToken: '12AghfdSfcDEW76F4ashYT',
                refreshToken: 'dasdqwd32df23f234f3qa',
                expiredDate: new Date()
            }
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

    });

    describe('login', function () {
        it('should return token when authentication is correct', function (done) {
            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve(authObj));
            spyOn(authObj, 'validatePassword').and.returnValue(true);
            spyOn(tokenHandlerMock, 'create').and.returnValue(authToJson);
            authController.login({
                body: authObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(responseObj);
                done();
            });

        });

        it('should return unauthorized response when password is not correct', function (done) {
            var incorrectAuthentication = {
                'password': '654321',
                'email': 'test@test.com'
            };

            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve(authObj));
            spyOn(authObj, 'validatePassword').and.returnValue(false);

            authController.login({
                body: incorrectAuthentication
            }, response);

            process.nextTick(function () {
                expect(response.status).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(INVALID_PASSWORD);
                done();
            });
        });

        it('should return a not found response whe no user was found', function (done) {
            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve());

            authController.login({
                body: authObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(EMAIL_NOT_FOUND);
                done();
            });
        });
    });

    describe('signUp', function () {
        it('should return the created token from the database', function (done) {

            spyOn(userModelMock, 'findOne').and.returnValue(Q.resolve(undefined));
            spyOn(userModelMock, 'create').and.returnValue(Q.resolve(userObj));
            spyOn(tokenHandlerMock, 'create').and.returnValue(authToJson);
            authController.signUp({
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

            authController.signUp({
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

            authController.signUp({
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
