'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var build = require('./../utils/buildHelper.js');

// run build in sequence - this shoud be implemented in Gulp 4 natively
gulp.task('build', function(cb) {
  build.setBuild(true);
  runSequence(
    ['wiredep','clean'],
    ['styles','jade', 'jshint'],
    ['images', 'copy', 'extras'<% if (includeModernizr) { %>, 'modernizr'<% }%>],
    'useref',
    'buildSize',
    cb
  );
});