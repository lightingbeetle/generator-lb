'use strict';

var gulp = require('gulp');

var reload = require('./browserSync.js').reload;

// Watch source files

gulp.task('watch', function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch(['app/views/**/*.jade', 'app/views/data/**/*.json'], ['jade']);
  gulp.watch('bower.json', ['wiredep', reload]);
  gulp.watch('app/scripts/**/*.js', ['jshint', reload]);
});
