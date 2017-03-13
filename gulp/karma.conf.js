module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-new-router/dist/router.es5.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'src/client/components/**/*.controller.js',
            'src/client/components/**/*.service.js',
            'src/client/common/**/*.service.js',
            'test/client/**/*.js'
        ],

        frameworks: ['jasmine'],

        browsers: [
            'PhantomJS'
        ],

        reporters: [
            'coverage', 'junit', 'spec'
        ],

        specReporter: {
            maxLogLines: 5
        },

        preprocessors: {
            'src/client/**/*.js': 'coverage'
        },

        coverageReporter: {
            dir: 'reports/coverage-client',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
            ]
        },

        junitReporter: {
            outputDir: 'reports/junit',
            outputFile: 'junit-client',
            useBrowserName: false
        }
    });
};
