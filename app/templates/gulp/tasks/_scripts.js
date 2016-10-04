'use strict';
var path = require('path');

var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');

var eslint = require('gulp-eslint');

var rollupStream = require('rollup-stream');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var uglify = require('rollup-plugin-uglify');
var source = require('vinyl-source-stream')

var buffer = require('vinyl-buffer');
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

var cache;

gulp.task('scripts', 'Compile ES6 to ES5', ['lintjs'],function () {
  var dest = build.isBuild() ? config.scripts.destBuild : config.scripts.dest;

  config.scripts.rollupCfg.entry = config.scripts.src;
  config.scripts.rollupCfg.rollup = rollup;
  config.scripts.rollupCfg.sourceMap = config.sourceMaps && !build.isBuild();
  config.scripts.rollupCfg.plugins = [
    nodeResolve({
      jsnext: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(build.isBuild() ? 'production' : 'development' )
    }),
    build.isBuild() ? uglify() : function() {},
  ];

  return rollupStream(config.scripts.rollupCfg)
    .on('bundle', function(bundle) {
      cache = bundle;
    })
    .on('error', handleError)
    .pipe(source(path.basename(config.scripts.rollupCfg.entry)))
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), buffer()))
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
});