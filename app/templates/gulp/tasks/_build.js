'use strict';

var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');
var size = require('gulp-size');
var notifier = require('node-notifier');

var config = require('./../config.js');
var build = require('./../utils/buildHelper.js');

// Output size of dist folder
gulp.task('buildSize:css', false, function () {
  return gulp.src(config.buildSize.srcCss)
    .pipe(size(config.buildSize.cfgCss));
});

// Output size of dist folder
gulp.task('buildSize:js', false, function () {
  return gulp.src(config.buildSize.srcJs)
    .pipe(size(config.buildSize.cfgJs));
});

// Output size of dist folder
gulp.task('buildSize:images', false, function () {
  return gulp.src(config.buildSize.srcImages)
    .pipe(size(config.buildSize.cfgImages));
});

// Output size of dist folder
gulp.task('buildSize', 'Determine size of `dist/` folder', ['buildSize:css', 'buildSize:js','buildSize:images'], function () {
  return gulp.src(config.buildSize.srcAll)
    .pipe(size(config.buildSize.cfgAll));
});

// run build in sequence - this shoud be implemented in Gulp 4 natively
gulp.task('build', 'Build project (use with --force to force build)', function(cb) {
  build.setBuild(true);
  runSequence(
    ['wiredep','clean'],
    ['styles', 'scripts'],
    ['images', 'copy', 'extras'<% if (includeModernizr) { %>, 'modernizr'<% }%>],
    'templates',
    'buildSize',
    function() {
      notifier.notify({
        title: 'Build',
        message: 'Build was successful'
      });
      cb();
    }
  );
});