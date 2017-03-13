var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    requireDir = require('require-dir')(),
    paths = require('./paths');

gulp.task('serve:watch', ['build:dev:client'], function () {
     browserSync.reload();
});

gulp.task('serve:dev', function () {
    var browserSyncConfig = {
        server: {
            baseDir: paths.build.client
        },
        port: paths.ports.dev,
        logLevel: "info",
        open: 'local'
    };

    browserSync.init(browserSyncConfig);

    gulp.watch(paths.src.client + '**/*', ['serve:watch']);
});

gulp.task('serve:dist', function () {
    var browserSyncConfig = {
        server: {
            baseDir: paths.dist.client
        },
        port: paths.ports.dist,
        logLevel: "silent",
        open: 'local'
    };

    browserSync.init(browserSyncConfig);
});

gulp.task('serve', ['serve:dev']);
