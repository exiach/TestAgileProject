(function () {
    'use strict';

    xdescribe('TodoList Controller Tests', function () {
        var $controller;
        var TodoListController;

        beforeEach(function () {
            module('app.todoList');
        });

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
            TodoListController = $controller('TodoListController', {
                NotificationService: {}
            });
        }));

        it("should be defined", function () {
            expect(TodoListController).toBeDefined();
        });
    });
})();