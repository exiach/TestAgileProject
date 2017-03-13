var proxyquire = require('proxyquire'),
    mongooseMock = require('../utils/mongoose-mock.js'),
    cryptHandlerMock = {
        decrypt: function() {},
        encrypt: function() {}
    },
    UserSchema,
    user;

describe('User model', function() {

    beforeEach(function () {

        UserSchema = proxyquire('../../../src/server/models/user.js', {
            '../utils/crypto-handler.js': cryptHandlerMock,
            'mongoose': mongooseMock
        });

        user = new UserSchema({
            _id: '123456',
            firstName: 'pablo',
            lastName: 'cusi',
            password: '123asd',
            email: 'user@jala.com',
            gender: 'female',
            birthday: '2016-01-26T20:40:43.961Z',
            token: 'UIHUDIHSAKLJiLJKSDIO'
        });

    });

    it('should return false when validate incorrect password', function () {
        spyOn(cryptHandlerMock, 'decrypt').and.returnValue('13asd');
        var validatePassword = user.validatePassword('123asd');
        expect(validatePassword).toBe(false);
        expect(cryptHandlerMock.decrypt).toHaveBeenCalled();
    });

    it('should return true when validate correct password', function () {
        spyOn(cryptHandlerMock, 'decrypt').and.returnValue('123asd');
        var validatePassword = user.validatePassword('123asd');
        expect(validatePassword).toBe(true);
        expect(cryptHandlerMock.decrypt).toHaveBeenCalled();
    });
});