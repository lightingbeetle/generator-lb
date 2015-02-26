'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

// Inject bower components

gulp.task('wiredep', function () {
  
  // SCSS
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: '../../',
      overides: {}
    }))
    .pipe(gulp.dest('app/styles'));
  
  // Jade
  gulp.src('app/views/layouts/*.jade')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official', 'modernizr'],
      ignorePath: '../../',
      overides: {}
    }))
    .pipe(gulp.dest('app/views/layouts'));
  
});