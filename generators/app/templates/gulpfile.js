/*jslint node: true */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var jshint = require('jshint');
var templatecache = require('gulp-angular-templatecache');
var sourcemap = require('gulp-sourcemaps');
var less = require('gulp-less');
var annotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var browserSync = require('browser-sync');
var browserSyncReload = browserSync.reload;


// var gCheerio = require('gulp-cheerio');
// var ngHtml2js = require("gulp-ng-html2js");
// var ngmin = require('gulp-ngmin');
// var packagejson = require('./package.json');
// var streamqueue = require('streamqueue');
// var rimraf = require('rimraf');
// var rename = require('gulp-rename');
// var domSrc = require('gulp-dom-src');



var options = {};
options.main = {
    path: {
        tmp:'.tmp',
        dev:'app',
        dist:'dist',
    }
};
options.browserSync = {
    server: {
        baseDir: "./app",
        routes: {
            "/bower_components": "bower_components"
        }
    }
};
options.less = {

};
options.hrml = {

};

var files = {
    index: options.main.path.dev+'/index.html',
    html: options.main.path.dev+'/**/*.html',
    less: options.main.path.dev+'/**/*.less',
    appless: options.main.path.dev+'/app.less',
};

// CLEAN
gulp.task('clean:dev', function() {
    return gulp.src(options.main.path.tmp)
    .pipe(clean());
});

// DEVELOPMENT TASKS
gulp.task('html:dev', function() {
    return gulp.src(files.html)
    .pipe(browserSyncReload({stream:true}));
});

gulp.task('less:dev', function() {
	return gulp.src(files.appless)
    .pipe(less())
    .pipe(gulp.dest(options.main.path.dev))
    .pipe(browserSyncReload({stream:true}));
});

// PRODUCTION TASKS
gulp.task('html:dist', function() {
    console.log('html');
});
gulp.task('less:dist', function() {
	return gulp.src(files.less)
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('./'+options.main.path.dist+'/styles'));
});

gulp.task('serve', ['less:dev'], function() {
    browserSync(options.browserSync);

    // html files
    gulp.watch(files.html, ['html:dev']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    // less files
    gulp.watch(files.less, ['less:dev']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('dev', ['clean:dev', 'less:dev', 'html:dev', 'watch']);
gulp.task('build', ['less:dist', 'html:dist', 'watch']);
gulp.task('default', ['serve']);
