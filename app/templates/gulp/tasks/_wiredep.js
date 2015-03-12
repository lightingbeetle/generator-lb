'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

var config = require('./../config.js');

// Inject bower components to sass
gulp.task('wiredep:sass', function() {
  return gulp.src(config.wiredep.sass.src)
    .pipe(wiredep(config.wiredep.sass.cfg))
    .pipe(gulp.dest(config.wiredep.sass.dest));
});

// Inject bower components to jade
gulp.task('wiredep:jade', function() {
  return gulp.src(config.wiredep.jade.src)
    .pipe(wiredep(config.wiredep.jade.cfg))
    .pipe(gulp.dest(config.wiredep.jade.dest));
});

// Inject bower components
gulp.task('wiredep', ['wiredep:sass','wiredep:jade']);