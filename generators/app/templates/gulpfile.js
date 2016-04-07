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
var connect = require('gulp-connect');
var less = require('gulp-less');
var annotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');


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
options.less = {

};
options.hrml = {

};

options.server = {
	development: {
		root: options.main.path.tmp,
		port: 8081,
		livereload: true
	},
	production: {
		root: options.main.path.dist,
		port: 8082,
		livereload: true
	}
};

var files = {
    index: options.main.path.dev+'/index.html',
    html: options.main.path.dev+'/**/*.html',
    less: options.main.path.dev+'/**/*.less',
};

// HTML
gulp.task('html:dev', function() {
    return gulp.src(files.index)
    .pipe(gulp.dest('./'+options.main.path.tmp));
});

gulp.task('html:dist', function() {
    console.log('html');
});

// LESS
gulp.task('less:dev', function() {
	return gulp.src(files.less)
    .pipe(less())
    .pipe(gulp.dest('./'+options.main.path.tmp+'/styles'));
});

gulp.task('less:dist', function() {
	return gulp.src(files.less)
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('./'+options.main.path.dist+'/styles'));
});

gulp.task('connect:dev', function() {
    connect.server(options.server.development);
});

gulp.task('connect:dist', function() {
    connect.server(options.server.production);
});

gulp.task('watch', function() {
    var htmlwatcher = gulp.watch(files.html, ['html:dev']);
	var lesswatcher = gulp.watch(files.less, ['less:dev']);

    htmlwatcher.on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    lesswatcher.on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('dev', ['less:dev', 'html:dev', 'connect:dev', 'watch']);
gulp.task('build', ['less:dist', 'html:dist', 'connect:dist', 'watch']);
gulp.task('default', ['dev']);
