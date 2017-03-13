var gulp = require('gulp'),
    less = require('gulp-less'),
    paths = require('./paths');

gulp.task('less', function () {
    return gulp.src(paths.src.client + '**/*.less')
        .pipe(less())
        .pipe(gulp.dest(paths.build.client));
});
