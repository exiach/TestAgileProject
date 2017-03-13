var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    paths  = require('./paths.js');

gulp.task('lint:server', function () {
    return gulp.src(paths.src.server + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('lint:client', function () {
    return gulp.src(paths.src.client + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('lint', ['lint:server', 'lint:client']);
