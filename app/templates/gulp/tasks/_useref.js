'use strict';

var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var config = require('./../config.js');

// Bundle css and js based on build tags

gulp.task('useref', function () {
  var assets = useref.assets(config.useref.assetsCfg);
  
  return gulp.src(config.useref.src)
    .pipe(assets)
    .pipe(gulpif('*.js', uglify())) // uglify JS
    .pipe(gulpif('*.css', minifyCss())) // minify CSS
    .pipe(rev())
    .pipe((assets.restore()))
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest(config.useref.dest))
    .pipe(rev.manifest(config.useref.revManifestCfg)) // create rev-manifest.json 
    .pipe(gulp.dest(config.useref.dest));
});