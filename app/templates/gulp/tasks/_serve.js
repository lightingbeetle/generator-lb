'use strict';

var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');

// Serve project with watching and livereload

gulp.task('serve', 'Serve project with livereload and file watching',function (cb) {
  runSequence(
    ['styles','templates', 'scripts'],
    <% if (includeModernizr) { %>'modernizr',<% } %>
    'browser-sync',
    'watch',
    cb
  );
});

gulp.task('serve:dist', 'Bulid preview', function (cb) {
  runSequence(
    'build',
    'browser-sync:dist',
    cb
  );
});