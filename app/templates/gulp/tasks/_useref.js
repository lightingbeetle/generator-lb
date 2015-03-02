'use strict';

var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

// Bundle css and js based on build tags

gulp.task('useref', function () {
  var assets = useref.assets({
    searchPath : 'app'
  });
  
  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify())) // uglify JS
    .pipe(gulpif('*.css', minifyCss())) // minify CSS
    .pipe(rev())
    .pipe((assets.restore()))
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({merge: true})) // create rev-manifest.json 
    .pipe(gulp.dest('dist'));
});