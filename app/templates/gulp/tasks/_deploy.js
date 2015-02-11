'use strict';

var gulp = require('gulp');

var rsync = require('gulp-rsync');
var plumber = require('gulp-plumber');

var handleError = require('./../utils/handleError.js');

// Deploying via rsync/sftp 
// Credentials are stored in .env file

// TODO plumber not working with this

gulp.task( 'deploy', ['build'], function() {
  return gulp.src('dist/**')
    .pipe(plumber(handleError))
    .pipe(rsync({
      root: 'dist',
      hostname: process.env.FTP_DEV_HOSTNAME,
      username: process.env.FTP_DEV_USER,
      destination: process.env.FTP_DEV_DEST
    }));
});

gulp.task( 'deploy:dist', ['build'], function() {
  return gulp.src('dist/**')
    .pipe(plumber(handleError))
    .pipe(rsync({
      root: 'dist',
      hostname: process.env.FTP_DIST_HOSTNAME,
      username: process.env.FTP_DIST_USER,
      destination: process.env.FTP_DIST_DEST
    }));
});