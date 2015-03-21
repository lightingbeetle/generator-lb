'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var size = require('gulp-size');

var build = require('./../utils/buildHelper.js');

// Output size of dist folder
gulp.task('buildSize', function () {
  return gulp.src(config.buildSize.src)
    .pipe(size(config.buildSize.cfg));
});

// run build in sequence - this shoud be implemented in Gulp 4 natively
gulp.task('build', function(cb) {
  build.setBuild(true);
  runSequence(
    ['wiredep','clean'],
    ['styles','jade', 'scripts'],
    ['images', 'copy', 'extras'<% if (includeModernizr) { %>, 'modernizr'<% }%>],
    'useref',
    'buildSize',
    cb
  );
});