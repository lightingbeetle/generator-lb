'use strict';

var gulp = require('gulp-help')(require('gulp'));

var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var config = require('./../config.js');

gulp.task('rev:files', function(){
  return gulp.src(config.rev.srcFiles)
    .pipe(rev())
    .pipe(gulp.dest(config.rev.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.rev.dest));
});

gulp.task('rev', 'Added hashes to files and rewrite file paths in HTML (Cache busting)', ['rev:files'], function(){
  return gulp.src(config.rev.srcHtml)
    .pipe(revReplace({manifest: gulp.src(config.rev.manifestPath)}))
    .pipe(gulp.dest(config.rev.dest));
});