var gulp = require('gulp'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    angularFilesort = require('gulp-angular-filesort'),
    paths = require('./paths'),
    mainBowerFiles = require('main-bower-files');

gulp.task('inject', function() {
    var cssFiles = gulp.src([
        paths.bowerFolder + '/bootstrap/**/*.css',
        paths.build.client + '**/*.css',
        '!' + paths.build.client + 'bower_components/**/*.css'
    ]);
    var dependencies = gulp.src(mainBowerFiles(), { read: false });
    var source = gulp.src(paths.src.client + '**/*.js').pipe(angularFilesort());

    return gulp.src(paths.src.client + 'index.html')
        .pipe(inject(cssFiles, {relative: false, ignorePath: ['build', 'server', 'client'],
            starttag: '<!-- inject:styles -->'}))
        .pipe(inject(dependencies, {relative: false, starttag: '<!-- inject:vendor -->'}))
        .pipe(inject(source, {relative: true, starttag: '<!-- inject:source -->'}))
        .pipe(gulp.dest(paths.build.client));
});
