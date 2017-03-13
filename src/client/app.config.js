(function () {
    'use strict';

    angular
        .module('AgileTracker')
        .config([
            '$translateProvider',
            '$translatePartialLoaderProvider',
            '$httpProvider',
            AgileTrackerConfiguration
        ]);

    function AgileTrackerConfiguration($translateProvider, $translatePartialLoaderProvider, $httpProvider) {
        $translatePartialLoaderProvider.addPart('languages');
        $translateProvider.useLoader('$translatePartialLoader', {urlTemplate: '/{part}/{lang}.json'});
        $translateProvider
            .registerAvailableLanguageKeys([ 'en', 'es'], {
                'en*': 'en',
                'es*': 'es'
            })
            .determinePreferredLanguage();

        $httpProvider.interceptors.push('ResourceInterceptorService');
    }

})();
