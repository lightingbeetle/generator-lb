'use strict';

var gulp = require('gulp-help')(require('gulp'));

var config = require('./../config.js');

// copy font to dist folder
gulp.task('fonts', 'Copy fonts to `dist/`', function () {
  return gulp.src(config.copyFonts.src)
    .pipe(gulp.dest(config.copyFonts.dest));
});

// copy icons to dist folder
gulp.task('icons', 'Copy icons to `dist/`', function () {
  return gulp.src(config.copyIcons.src)
    .pipe(gulp.dest(config.copyIcons.dest));
});

// copy extras in app/ directory
gulp.task('extras', 'Copy extras in `app/` root to `dist/`', function () {
  return gulp.src(config.copyExtras.src, config.copyExtras.cfg)
  .pipe(gulp.dest(config.copyExtras.dest));
});

gulp.task('copy', 'Copy fonts and extras to `dist/` folder', ['fonts', 'extras', 'icons']);