var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('Story Controller', function () {
    var storyController,
        storyObj,
        response,
        storyModelMock = jasmine.createSpyObj('storyModelMock',
            ['create', 'find', 'findOne', 'findOneAndRemove', 'findOneAndUpdate']);

    beforeEach(function () {

        storyController = proxyquire('../../../src/server/controllers/story.js', {
            '../models/story.js': storyModelMock
        });

        response = {
            send: jasmine.createSpy('responseSpy'),
            sendStatus: jasmine.createSpy('responseSpy')
        };

        storyObj = {
            id: 1,
            title: 'title 1',
            description: 'task 1',
            type: 'Bug',
            points: 5,
            status: 'Backlog',
            projectId: 1
        };
    });

    describe('getAll', function () {
        it('should return all the stories from the database', function (done) {
            var stories = [
                {
                    title: 'title1',
                    description: 'story1',
                    type: 'Bug',
                    points: 5,
                    status: 'Backlog',
                    projectId: 1
                },
                {
                    title: 'title2',
                    description: 'story2',
                    type: 'Bug',
                    points: 8,
                    status: 'Current',
                    projectId: 1
                }
            ];

            storyModelMock.find.and.returnValue(Q.resolve(stories));

            storyController.getAll({
                params: {
                    projectId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(stories);
                done();
            });
        });

        it('should return an 404 status code when no stories are found', function (done) {
            storyModelMock.find.and.returnValue(Q.resolve([]));

            storyController.getAll({
                params: {
                    projectId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('getOne', function () {
        it('should return one story from the database', function (done) {

            storyModelMock.findOne.and.returnValue(Q.resolve(storyObj));

            storyController.getOne({
                params: {
                    projectId: 1,
                    storyId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(storyObj);
                done();
            });
        });

        it('should return an 404 status code when the story is not found', function (done) {
            storyModelMock.findOne.and.returnValue(Q.resolve([]));

            storyController.getOne({
                params: {
                    projectId: 1,
                    storyId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('save', function () {
        it('should return one story from the database', function (done) {

            storyModelMock.create.and.returnValue(Q.resolve(storyObj));

            storyController.save({
                params: {
                    projectId: 1
                },
                body: storyObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(storyObj);
                done();
            });
        });
    });

    describe('remove', function () {
        it('should remove one story from the database', function (done) {

            storyModelMock.findOneAndRemove.and.returnValue(Q.resolve(storyObj));

            storyController.remove({
                params: {
                    projectId: 1,
                    storyId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(storyObj);
                done();
            });
        });

        it('should return an 404 status code when the story is not found', function (done) {
            storyModelMock.findOneAndRemove.and.returnValue(Q.resolve([]));

            storyController.remove({
                params: {
                    projectId: 1,
                    storyId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('update', function () {
        it('should update one story from the database', function (done) {

            storyModelMock.findOneAndUpdate.and.returnValue(Q.resolve(storyObj));

            storyController.update({
                params: {
                    projectId: 1,
                    storyId: 1
                },
                body: storyObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(storyObj);
                done();
            });
        });

        it('should return an 404 status code when the story is not found', function (done) {

            storyModelMock.findOneAndUpdate.and.returnValue(Q.resolve([]));

            storyController.update({
                params: {
                    projectId: 1,
                    storyId: 1
                },
                body: storyObj
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });
});