(function () {
  	'use strict';
  	angular
		.module('app.notification')
		.directive('notify', notify);

	function notify() {
		return {
			restrict: 'E',
	  		scope: false,
	  		replace: true,
	  		templateUrl: 'common/notification/notification.template.html'
	  	};
	}
}());