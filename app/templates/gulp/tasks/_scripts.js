'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');

var eslint = require('gulp-eslint');

var rollup = require('gulp-rollup');
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');

var sourcemaps = require('gulp-sourcemaps');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');

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
  var dest = build.isBuild() ? config.scripts.destBuild : config.scripts.dest;
  
  config.scripts.rollupCfg.sourceMap = config.sourceMaps && !build.isBuild();
  config.scripts.rollupCfg.plugins = [
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    build.isBuild() ? uglify() : function() {},
  ];
  
  return gulp.src(config.scripts.src)
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.init()))
    .pipe(rollup(config.scripts.rollupCfg))
    .on('error', handleError)
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
});