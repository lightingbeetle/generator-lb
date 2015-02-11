'use strict';

var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');

// Bundle css and js based on build tags

gulp.task('useref', function () {
  var assets = useref.assets({
    searchPath : 'app'
  });
  
  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify())) // uglify JS
    .pipe(gulpif('*.css', minifyCss())) // minify CSS
    .pipe((assets.restore()))
    .pipe(useref())
    //.pipe(rev()) // add revision to files
    //.pipe(rev.manifest()) // create rev-manifest.json 
    .pipe(gulp.dest('dist'));
});