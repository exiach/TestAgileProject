var gulp   = require('gulp'),
    runSequence = require('run-sequence'),
    karmaServer = require('karma').Server,
    jasmine = require('gulp-jasmine'),
    reporters = require('jasmine-reporters'),
    paths = require('./paths'),
    istanbul = require('gulp-istanbul');


gulp.task('test:client', function(done) {
    console.log('-------------CLIENT TESTS RUNNING------------------');
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('pre-server-test', function () {
    return gulp.src([paths.src.server + '**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test:server', ['pre-server-test'], function() {
    console.log('-------------SERVER TESTS RUNNING------------------');
    return gulp.src([
            '!' + paths.src.server + 'server.js',
            paths.src.server + '**/*.js',
            'test/server/**/*.spec.js'
        ])
        .pipe(jasmine({
            reporter: [
                new reporters.JUnitXmlReporter({savePath: 'reports/junit'}),
                new reporters.TerminalReporter({
                    verbosity: 3,
                    color: true,
                    showStack: true
                })
            ]
        }))
        .pipe(istanbul.writeReports({
            dir: './reports/coverage-server'
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', function () {
            process.exit();
        })
        .on('error', function () {
            process.exit();
        });
});

gulp.task('test', function(done) {
    runSequence(
        'test:client',
        'test:server',
        function (error) {
            done(error);
        });
});
