'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./../config.js');
var jsHintErrorReporter = require('./../utils/jsHintErrorReporter.js');
var handleError = require('./../utils/handleError.js');

// Lint .js files

gulp.task('jshint', function () {
  return gulp.src(config.jshint.src)
    .pipe(jshint())
    .pipe(jshint.reporter(config.jshint.reporter))
    .pipe(jsHintErrorReporter())
    .on('error', handleError);
});


gulp.task('scripts', ['jshint'],function () {
  <% if (includeES6) { %>return gulp.src(config.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .on('error', handleError)
    .pipe(gulp.dest(config.scripts.dest));<% } %>
});