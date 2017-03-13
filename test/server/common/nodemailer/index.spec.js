var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('Project Controller', function () {
    var mailerModule,
        nodemailerMock,
        nodemailerConfigMock,
        mgMock,
        templatesMock,
        userMock,
        projectMock;

    mgMock = function () {};
    nodemailerConfigMock = {};
    nodemailerMock = jasmine.createSpyObj('nodemailerMock', ['sendMail', 'createTransport']);
    templatesMock = jasmine.createSpyObj('templatesMock', ['getCompiledTemplate']);

    beforeEach(function () {

        mailerModule = proxyquire('../../../../src/server/common/nodemailer/index.js', {
            'nodemailer': nodemailerMock,
            '../../config/nodemailer': nodemailerConfigMock,
            'nodemailer-mailgun-transport': mgMock,
            '../templates': templatesMock
        });

        userMock = {
            firstName: 'first',
            lastName: 'last'
        };

        projectMock = {
            title: 'a title'
        }
    });

        it('sendUserAddedToProjectNotification should send a email', function (done) {
            var html = '<div></div>';
            var templateValuesMock = {
                projectTitle: projectMock.title,
                userName: userMock.firstName + ' ' + userMock.lastName
            };
            templatesMock.getCompiledTemplate.and.returnValue(Q.resolve(html));

            mailerModule.sendUserAddedToProjectNotification(userMock, projectMock);

            process.nextTick(function () {
                expect(templatesMock.getCompiledTemplate).toHaveBeenCalled();
                expect(templatesMock.getCompiledTemplate)
                    .toHaveBeenCalledWith('notification-email', templateValuesMock);
                done();
            });
        });

        it('sendSignUpUserNotification should send a email', function (done) {
            var html = '<div></div>';
            var templateValuesMock = {
                userName: userMock.firstName + ' ' + userMock.lastName
            };
            templatesMock.getCompiledTemplate.and.returnValue(Q.resolve(html));

            mailerModule.sendSignUpUserNotification(userMock);

            process.nextTick(function () {
                expect(templatesMock.getCompiledTemplate).toHaveBeenCalled();
                expect(templatesMock.getCompiledTemplate)
                    .toHaveBeenCalledWith('new-user-notification', templateValuesMock);
                done();
            });
        });
    });