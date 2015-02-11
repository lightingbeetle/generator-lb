'use strict';

var gulp = require('gulp');

// copy extras in app/ directory
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
  ], {
    dot: true
  })
  .pipe(gulp.dest('dist'));
});