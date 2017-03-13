var gulp = require('gulp'),
    requireDir = require('require-dir')('./gulp'),
    sequence = require('gulp-sequence');

gulp.task('start:dev', sequence(['supervisor', 'serve', 'watch']));

gulp.task('start:dist', sequence(['supervisor', 'serve']));

gulp.task('run:dev', ['build:dev'], function () {
    gulp.start('start:dev');
});

gulp.task('run', ['run:dev']);

gulp.task('default', ['build:dev']);
