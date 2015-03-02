'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

// Serve project with livereload

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['app', '.tmp'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });
});

// Serve dist of project

gulp.task('browser-sync:dist', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    reloadDelay: 500,
  });
});

module.exports.reload = browserSync.reload;