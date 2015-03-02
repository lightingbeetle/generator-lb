'use strict';

var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var build = require('./../utils/buildHelper.js');

// Lean Modernizr build

gulp.task('modernizr', function () {
  return gulp.src(['app/scripts/**/*.js', '.tmp/styles/*.css'])
    .pipe(modernizr({silent: true}))
    .pipe(uglify())
    .pipe(gulp.dest('.tmp/scripts/vendor/'));
});