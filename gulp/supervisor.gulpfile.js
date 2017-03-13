var gulp = require('gulp'),
    requireDir = require('require-dir')(),
    paths = require('./paths'),
    supervisor = require('gulp-supervisor');

gulp.task('supervisor', function() {
    supervisor(paths.build.server + 'server.js', {
        args: [],
        watch: [paths.src.server],
        ignore: [
            '.idea/**/*',
            'node_modules/**/*'
        ],
        pollInterval: 500,
        extensions: ['js', 'json'],
        exec: 'node',
        debugBrk: false,
        noRestartOn: 'exit',
        forceWatch: true,
        quiet: false
    });
});