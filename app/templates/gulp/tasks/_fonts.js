'use strict';

var gulp = require('gulp');

// copy font to dist folder
gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});