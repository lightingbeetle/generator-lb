'use strict';

var gulp = require('gulp');

var config = require('./../config.js');

// copy font to dist folder
gulp.task('fonts', function () {
  return gulp.src(config.copyFonts.src)
    .pipe(gulp.dest(config.copyFonts.dest));
});

// copy extras in app/ directory
gulp.task('extras', function () {
  return gulp.src(config.copyExtras.src, config.copyExtras.cfg)
  .pipe(gulp.dest(config.copyExtras.dest));
});

gulp.task('copy', ['fonts','extras']);