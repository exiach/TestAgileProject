(function () {
    'use strict';
    angular
        .module('app.todoList', [])
        .controller('TodoListController', TodoListController);

    TodoListController.$inject = ['NotificationService'];

    function TodoListController(NotificationService) {
        /* .jshintrc validthis: true */
        var vm = this;

        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;
        vm.todo = {};
        vm.todos = [
            { text: 'Read angularJS controllers', status: true },
            { text: 'Read angularJS services', status: false }
        ];

        function addTodo() {
            vm.todos.push({ text: vm.textBox, status: false });
            var message = (vm.textBox || 'Empty element') + ' added';

            var config = {
                message: message,
                position: 'Right'
            };

            NotificationService.display(config);

            vm.textBox = '';
        }

        function removeTodo(item) {
            var index = vm.todos.indexOf(item);
            vm.todos.splice(index, 1);

            var message = item.text + ' removed';

            var config = {
                message: message,
                position: 'Right'
            };

            NotificationService.display(config);
        }
    }
})();
