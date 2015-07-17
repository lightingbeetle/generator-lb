'use strict';

var gulp = require('gulp-help')(require('gulp'));

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;

// Watch source files

gulp.task('watch', 'Watch source files', function () {
  gulp.watch(config.watch.styles, ['styles']);
  gulp.watch(config.watch.jade, ['templates', reload]);
  gulp.watch(config.watch.wiredep, ['wiredep', reload]);
  gulp.watch(config.watch.scripts, ['scripts', reload]);
});
