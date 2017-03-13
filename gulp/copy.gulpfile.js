var gulp = require('gulp');

var dir = {};
dir.build = './build';
dir.src = './src';
dir.buildClient = dir.build + '/server/client';
dir.buildServer = dir.build +  '/server';
dir.srcClient = dir.src + '/client';
dir.srcServer = dir.src + '/server';

gulp.task('copy:client-scripts', function(){
    return gulp.src(dir.srcClient + '/**/*.js')
        .pipe(gulp.dest(dir.buildClient));
});

gulp.task('copy:css', function(){
    return gulp.src(dir.srcClient + '/**/*.css')
        .pipe(gulp.dest(dir.buildClient));
});

gulp.task('copy:bower-dependencies', function(){
    return gulp.src('./bower_components/**/*.*')
        .pipe(gulp.dest(dir.buildClient + '/bower_components'));
});

gulp.task('copy:images', function(){
    return gulp.src(dir.srcClient + '/img/**/*.*')
        .pipe(gulp.dest(dir.buildClient +  '/img'));
});

gulp.task('copy:html', function(){
    return gulp.src(dir.srcClient + '/**/*.html')
        .pipe(gulp.dest(dir.buildClient));
});

gulp.task('copy:server-scripts', function(){
    return gulp.src(dir.srcServer + '/**/*.js')
        .pipe(gulp.dest(dir.buildServer));
});

gulp.task('copy:server-json', function(){
    return gulp.src(dir.srcServer + '/**/*.json')
        .pipe(gulp.dest(dir.buildServer));
});

gulp.task('copy:json', function(){
    return gulp.src(dir.srcClient + '/**/*.json')
        .pipe(gulp.dest(dir.buildClient));
});

gulp.task('copy:server', ['copy:server-scripts', 'copy:server-json']);

gulp.task('copy:client', ['copy:client-scripts', 'copy:css', 'copy:bower-dependencies', 'copy:images', 'copy:html', 'copy:json']);

gulp.task('copy', ['copy:server', 'copy:client']);
