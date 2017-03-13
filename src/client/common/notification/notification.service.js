(function () {
	'use strict';
	angular
		.module('app.notification', [])
		.factory('NotificationService', NotificationService);

	NotificationService.$inject = [
		'$timeout',
		'$compile',
		'$rootScope'
	];

	function NotificationService($timeout, $compile, $rootScope) {
		var defaultConfig = {
			type: { name: 'Info', class: 'alert alert-info' },
			position: 'Center',
			duration: 5000
		};

		var messageElements = [];
		var openNotifScopes = [];

		return {
			display: display,
			closeAll: closeAll
		};

		function display(config) {
			var container = config.container || document.body;
			var type = config.type || defaultConfig.type;
			var duration = config.duration || defaultConfig.duration;

			var scope = $rootScope.$new();
			scope.message = config.message;
			scope.classes = type.class;
			scope.position = config.position || defaultConfig.position;

			var templateElement = $compile('<notify></notify>')(scope);

			angular.element(container).append(templateElement);
			messageElements.push(templateElement);

			scope.close = function close() {
				templateElement.remove();
				messageElements.splice(messageElements.indexOf(templateElement), 1);
				openNotifScopes.splice(openNotifScopes.indexOf(scope), 1);
			};

			$timeout(function () {
				scope.close();
			}, duration);

			openNotifScopes.push(scope);
		}

		function closeAll() {
			messageElements.forEach(function (elem) {
				elem.remove();
			});
			messageElements.splice(0, messageElements.length);
			openNotifScopes.splice(0, openNotifScopes.length);
		}
	}
}());
