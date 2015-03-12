'use strict';

var gulp = require('gulp');
var size = require('gulp-size');

var config = require('./../config.js');

// Output size of dist folder

gulp.task('buildSize', function () {
  return gulp.src(config.buildSize.src)
    .pipe(size(config.buildSize.cfg));
});