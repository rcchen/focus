var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rs = require('run-sequence');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var webpackConfig = require("./webpack.config.js");

gulp.task('build', function() {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new plugins.util.PluginError("webpack", err);
        plugins.util.log("[webpack]", "Emitted output file successfully");
    });
});

/**
 * Cleans out the build directory
 */
gulp.task('clean', function() {
    return del('./build/**/*');
});

gulp.task('copy', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
})

/**
 * Runs by default when only gulp is invoked
 */
gulp.task('default', function() {
    rs(
        'clean',
        'copy',
        'build',
        'serve',
        'watch'
    );
});

gulp.task('serve', function() {
    plugins.connect.server({
        root: 'build'
    });
});

/**
 * Watch for changes
 */
gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts*', ['build']);
    gulp.watch('./src/index.html', ['copy']);
});
