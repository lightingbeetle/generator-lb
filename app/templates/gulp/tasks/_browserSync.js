'use strict';

var gulp = require('gulp-help')(require('gulp'));
var browserSync = require('browser-sync');

var config = require('./../config.js');

// Serve project with livereload

gulp.task('browser-sync', false, function() {
  browserSync(config.browserSync.dev);
});

// Serve dist of project

gulp.task('browser-sync:dist', false, function() {
  browserSync(config.browserSync.dist);
});

module.exports.reload = browserSync.reload;