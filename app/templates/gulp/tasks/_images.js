'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var config = require('./../config.js');

// Optimize images

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(cache(imagemin(config.images.cfg)))
    .pipe(gulp.dest(config.images.dest));
});