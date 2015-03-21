'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Serve project with watching and livereload

gulp.task('serve', function (cb) {
  runSequence(
    'wiredep',
    ['styles','jade', 'scripts'],
    <% if (includeModernizr) { %>'modernizr',<% } %>
    'browser-sync',
    'watch',
    cb
  );
});

gulp.task('serve:dist', function (cb) {
  runSequence(
    'build',
    'browser-sync:dist',
    cb
  );
});