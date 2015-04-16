'use strict';

var gulp = require('gulp-help')(require('gulp'));

var rsync = require('gulp-rsync');
var plumber = require('gulp-plumber');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');

// Deploying via rsync/sftp 
// Credentials are stored in .env file

// TODO plumber not working with this

gulp.task('deploy', 'Deploy to development enviroment (specified in `.env`)', function() {
  return gulp.src(config.deploy.src)
    .pipe(plumber(handleError))
    .pipe(rsync(config.deploy.dev));
});

gulp.task('deploy:prod', 'Deploy to production enviroment (specified in `.env`)', function() {
  return gulp.src(config.deploy.src)
    .pipe(plumber(handleError))
    .pipe(rsync(config.deploy.dist));
});