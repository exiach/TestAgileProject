var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir')();

gulp.task('build:dev:client', function(callback) {
    return runSequence(
        'lint:client',
        'copy:client',
        'less',
        'inject',
        function (error) {
            if (error) {
                console.log(error.message);
            }

            callback(error);
        });
});

gulp.task('build:dev:server', function(callback) {
    return runSequence(
        'lint:server',
        'copy:server',
        function (error) {
            if (error) {
                console.log(error.message);
            }

            callback(error);
        });
});

gulp.task('build:dev', ['build:dev:client', 'build:dev:server']);

gulp.task('build', ['build:dev']);

// TODO [01/13/2015] Adds tasks for distribution mode
gulp.task('build:dist', []);
