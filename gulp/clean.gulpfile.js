var gulp = require('gulp'),
    del = require('del'),
    paths = require('./paths');

gulp.task('clean:dev', function() {
    return del([paths.buildFolder]);
});

gulp.task('clean:dev:client', function() {
    return del([paths.build.client]);
});

gulp.task('clean:dist', function() {
    return del([paths.distFolder]);
});

gulp.task('clean', ['clean:dev']);
