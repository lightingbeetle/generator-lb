'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var jsHintErrorReporter = require('./../utils/jsHintErrorReporter.js');
var handleError = require('./../utils/handleError.js');

// Lint .js files

gulp.task('jshint', function () {
  return gulp.src(['app/scripts/**/*.js', '!app/scripts/plugins/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jsHintErrorReporter())
    .on('error', handleError);
});