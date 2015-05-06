'use strict';

var gulp = require('gulp-help')(require('gulp'));
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var config = require('./../config.js');

// Bundle css and js based on build tags

gulp.task('useref', 'Bundle CSS and JS based on build tags and copy to `dist/` folder',function () {
  var assets = useref.assets(config.useref.assetsCfg);
  
  return gulp.src(config.useref.src)
    .pipe(assets)
    .pipe(gulpif('*.js', gulpif(config.uglifyJs, uglify()))) // uglify JS
    .pipe(gulpif('*.css', gulpif(config.minifyCss, minifyCss()))) // minify CSS
    .pipe(gulpif(config.cacheBust, rev()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulpif(config.cacheBust, revReplace()))
    .pipe(gulp.dest(config.useref.dest))
    .pipe(gulpif(config.cacheBust, rev.manifest(config.useref.revManifestCfg))) // create rev-manifest.json 
    .pipe(gulp.dest(config.useref.dest));
});