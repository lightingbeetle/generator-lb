'use strict';

var gulp = require('gulp-help')(require('gulp'));
var modernizr = require('gulp-modernizr');

var config = require('./../config.js');
var build = require('./../utils/buildHelper.js');

// Lean Modernizr build

gulp.task('modernizr', 'Create modernizr lean build', function () {
  var dest = build.isBuild() ? config.modernizr.destBuild : config.modernizr.dest;

  return gulp.src(config.modernizr.src)
    .pipe(modernizr(config.modernizr.cfg))
    .pipe(gulp.dest(dest));
});