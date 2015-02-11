'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');

var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');

// Compile jade to html

gulp.task('jade', ['jade:prepareData'], function() {
  return gulp.src('app/views/*.jade')
    .pipe(plumber(handleError))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('./app/views/data.json'));
    }))
    .pipe(jade({
      pretty: true,
      compileDebug: false
    }))
    .pipe(gulp.dest('.tmp/'))
    .pipe(reload({stream:true}));
});

// Concat *.json file to single data.json

gulp.task('jade:prepareData', function() {
  return gulp.src('app/views/data/*.json')
  .pipe(extend('data.json'))
  .pipe(gulp.dest('app/views/'));
});