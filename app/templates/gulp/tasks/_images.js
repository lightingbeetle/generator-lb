'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Optimize images

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});