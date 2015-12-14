var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rs = require('run-sequence');

var srcProject = plugins.typescript.createProject('./src/tsconfig.json');

gulp.task('build', function() {
    return srcProject.src()
        .pipe(plugins.typescript(srcProject))
        .pipe(gulp.dest('./build'));
});

/**
 * Cleans out the build directory
 */
gulp.task('clean', function() {
    return del('./build/**/*');
});

/**
 * Runs by default when only gulp is invoked
 */
gulp.task('default', function() {
    rs(
        'clean',
        'build',
        'serve',
        'watch'
    );
});

/**
 * Starts up a nodemon server
 */
gulp.task('serve', function() {
    plugins.nodemon({
        ext: 'js',
        script: './build/index.js'
    });
});

/**
 * Watch for changes
 */
gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts', ['build']);
});
