var gulp = require('gulp'),
    paths = require('./paths'),
    requireDir = require('require-dir')(),
    watch = require('gulp-watch');

gulp.task('watch:server', function () {
    return gulp.watch([paths.src.server + '**/*'], ['copy:server']);
});

gulp.task('watch', ['watch:server']);
