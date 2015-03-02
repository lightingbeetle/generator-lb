'use strict';

var gulp = require('gulp');
var cache = require('gulp-cache');

// Optimize images

gulp.task('clearCache', function (done) {
  return cache.clearAll(done);
});