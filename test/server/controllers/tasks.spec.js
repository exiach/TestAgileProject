var proxyquire = require('proxyquire').noCallThru(),
    Q = require('q');

describe('Taks Controller', function () {
    var taskController,
        taskObj,
        response,
        taskModelMock = {
            create: function () {},
            find: function () {},
            findById: function () {},
            findByIdAndRemove: function () {},
            findByIdAndUpdate: function () {}
        };

    beforeEach(function() {
        taskController = proxyquire('../../../src/server/controllers/tasks.js', {
            '../models/task.js': taskModelMock
        });

        response = {
            send: jasmine.createSpy('responseSpy'),
            sendStatus: jasmine.createSpy('responseSpy')
        };

        taskObj= {
            id: 1,
            description: 'task 1',
            completed: false
        };
    });

    describe('getAll', function () {
        it('should return all the tasks from the database', function (done) {
            var tasks = [
                { description: 'task1', completed: 'false'},
                { description: 'task2', completed: 'true'}
            ];

            spyOn(taskModelMock, 'find').and.returnValue(Q.resolve(tasks));

            taskController.getAll({}, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(tasks);
                done();
            });
        });

        it('should return an 404 status code when no tasks are found', function (done) {
            spyOn(taskModelMock, 'find').and.returnValue(Q.resolve([]));

            taskController.getAll({}, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('getOne', function () {
        it('should return one task from the database', function (done) {

            spyOn(taskModelMock, 'findById').and.returnValue(Q.resolve(taskObj));

            taskController.getOne({
                params: {
                    taskId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(taskObj);
                done();
            });
        });

        it('should return an 404 status code when the task is not found', function (done) {
            spyOn(taskModelMock, 'findById').and.returnValue(Q.resolve([]));

            taskController.getOne({
                params: {
                    taskId: 1
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
        it('should return one task from the database', function (done) {

            spyOn(taskModelMock, 'create').and.returnValue(Q.resolve(taskObj));

            taskController.save({
                body: taskObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(taskObj);
                done();
            });
        });
    });

    describe('remove', function () {
        it('should remove one task from the database', function (done) {

            spyOn(taskModelMock, 'findByIdAndRemove').and.returnValue(Q.resolve(taskObj));

            taskController.remove({
                params: {
                    taskId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(taskObj);
                done();
            });
        });

        it('should return an 404 status code when the task is not found', function (done) {
            spyOn(taskModelMock, 'findByIdAndRemove').and.returnValue(Q.resolve([]));

            taskController.remove({
                params: {
                    taskId: 1
                }
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });

    describe('remove', function () {
        it('should update one task from the database', function (done) {

            spyOn(taskModelMock, 'findByIdAndUpdate').and.returnValue(Q.resolve(taskObj));

            taskController.update({
                params: {
                    taskId: 1
                },
                body: taskObj
            }, response);

            process.nextTick(function () {
                expect(response.send).toHaveBeenCalled();
                expect(response.send).toHaveBeenCalledWith(taskObj);
                done();
            });
        });

        it('should return an 404 status code when the task is not found', function (done) {

            spyOn(taskModelMock, 'findByIdAndUpdate').and.returnValue(Q.resolve([]));

            taskController.update({
                params: {
                    taskId: 1
                },
                body: taskObj
            }, response);

            process.nextTick(function () {
                expect(response.sendStatus).toHaveBeenCalled();
                expect(response.sendStatus).toHaveBeenCalledWith(404);
                done();
            });
        });
    });
});
