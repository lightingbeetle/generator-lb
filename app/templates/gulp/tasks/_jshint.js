'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

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