'use strict';

var gulp = require('gulp');
var del = require('del');

var config = require('./../config.js');

// Cleaning task

gulp.task('clean', del.bind(null, config.clean));