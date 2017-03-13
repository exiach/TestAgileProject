var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('Project Controller', function () {
    var projectController,
        projectObj,
        userObj,
        response,
        projectModelMock = jasmine.createSpyObj('projectModelMock',
            ['create', 'save', 'find', 'findOne', 'findOneAndUpdate', 'populate']),
        userModelMock = jasmine.createSpyObj('userModelMock',
            ['create', 'find', 'findOne', 'findOneAndUpdate']),
        mailerMock = jasmine.createSpyObj('mailerMock', ['sendMail',
        'sendUserAddedToProjectNotification']),
        templatesMock = jasmine.createSpyObj('templatesMock', ['getCompiledTemplate']);

    beforeEach(function () {

        projectController = proxyquire('../../../src/server/controllers/project.js', {
            '../models/project': projectModelMock,
            '../models/user': userModelMock,
            '../common/nodemailer': mailerMock,
            '../common/templates': templatesMock
        });

        response = {
            send: jasmine.createSpy('responseSpy'),
            sendStatus: jasmine.createSpy('responseSpy')
        };

        projectObj = {
            projectId: "1",
            title: 'title test',
            description: 'task 1',
            iterationLength: '78',
            startDate: '2015-12-21T19:32:35.904Z',
            users: []
        };

        userObj = {
            '_id': 'c7ds9',
            'firstName' : 'User',
            'lastName' : 'Test',
            'password' : '123456',
            'email' : 'user.test@test.com',
            'gender' : 'male',
            'birthday' : '11/18/1989',
            'projects' : []
        };
    });

    describe('getAll', function () {
        it('should return all the project from the database', function (done) {
            var projects = [
                {
                    title: 'title8',
                    description: 'description',
                    iterationLength: '8',
                    startDate: '2015-12-21T19:32:35.904Z'
                }
            ];

            projectModelMock.find.and.returnValue(Q.resolve(projects));

            projectController.getAll({}, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(projects);
                done();
            });
        });

        it('should return an 404 status code when no project are found', function (done) {
            projectModelMock.find.and.returnValue(Q.resolve([]));

            projectController.getAll({}, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('getOne', function () {
        it('should return one project from the database', function (done) {
            projectModelMock.findOne.and.returnValue(Q.resolve(projectObj));

            projectController.getOne({
                params: {
                    projectId: "1"
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(projectObj);
                done();
            });
        });

        it('should return an 404 status code when the project is not found', function (done) {
            projectModelMock.findOne.and.returnValue(Q.resolve([]));

            projectController.getOne({
                params: {
                    projectId: "2312312312312"
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('modify', function () {
        it('should update one project from the database', function (done) {
            projectModelMock.findOneAndUpdate.and.returnValue(Q.resolve(projectObj));

            projectController.update({
                params: {
                    projectId: "1"
                },
                body: projectObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(projectObj);
                done();
            });
        });

        it('should return an 404 status code when the project is not found', function (done) {
            projectModelMock.findOneAndUpdate.and.returnValue(Q.resolve([]));

            projectController.update({
                params: {
                    projectId: "1546545645646"
                },
                body: projectObj
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('save', function () {
        it('should return Error: The Project name already exist message', function (done) {
            projectModelMock.findOne.and.returnValue(Q.resolve(projectObj));

            projectController.save({
                body: projectObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith({Error: 'The Project name already exist'});
                done();
            });
        });
    });

    describe('addUser', function () {

        describe('when the user and project exists', function () {
            var htmlMock = '<div> mock-html </div>';
            var paramsMock;

            beforeEach(function () {
                paramsMock = {
                    projectId: 0
                };
            });

            it('should push send status code 404 when the user is not found', function (done) {
                userModelMock.findOne.and.returnValue(Q.resolve());
                projectModelMock.findOne.and.returnValue(Q.resolve(projectObj));


                projectController.addUser({
                    body: projectObj,
                    params: paramsMock
                }, response);

                process.nextTick(function () {
                    expect(response.statusCode).toBe(404);
                    done();
                });
            });

            it('should push send status code 404 when the project is not found', function (done) {
                userModelMock.findOne.and.returnValue(Q.resolve(userObj));
                projectModelMock.findOne.and.returnValue(Q.resolve());


                projectController.addUser({
                    body: projectObj,
                    params: paramsMock
                }, response);

                process.nextTick(function () {
                    expect(response.statusCode).toBe(404);
                    done();
                });
            });

            it('should push found user on project and save the model changes', function (done) {
                userModelMock.findOne.and.returnValue(Q.resolve(userObj));
                projectModelMock.findOne.and.returnValue(Q.resolve(projectObj));
                spyOn(projectObj.users, 'push');
                projectObj.save = jasmine.createSpy('saveSpy').and.returnValue(Q.resolve(projectObj));
                templatesMock.getCompiledTemplate.and.returnValue(Q.resolve(htmlMock));
                mailerMock.sendUserAddedToProjectNotification.and.returnValue(Q.resolve('email sent'));


                projectController.addUser({
                    body: projectObj,
                    params: paramsMock
                }, response);

                process.nextTick(function () {
                    expect(projectObj.users.push).toHaveBeenCalledWith(userObj);
                    expect(projectObj.save).toHaveBeenCalled();
                    expect(response.send).toHaveBeenCalledWith(projectObj);
                    done();
                });
            });
        });
    });

});
