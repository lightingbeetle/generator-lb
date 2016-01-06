'use strict';

var gulp = require('gulp-help')(require('gulp'));
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');

// Lint .js files

gulp.task('lintjs', 'Lint js files', function () {
  if (config.lintJs) {
    return gulp.src(config.eslint.src)
      .pipe(eslint({ignore: false})) // temp hack with ignore
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .on('error', handleError);
  } else {
    return;
  }
});


gulp.task('scripts', 'Compile ES6 to ES5', ['lintjs'],function () {
  return gulp.src(config.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel(config.scripts.babel))
    .on('error', handleError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.dest));
});