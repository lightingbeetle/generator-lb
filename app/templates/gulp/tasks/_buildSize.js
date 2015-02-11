'use strict';

var gulp = require('gulp');
var size = require('gulp-size');

// Output size of dist folder

gulp.task('buildSize', function () {
  return gulp.src('dist/**/*')
    .pipe(size({
      title: 'build', 
      gzip: true
    }));
});