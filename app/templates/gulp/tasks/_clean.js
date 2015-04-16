'use strict';

var gulp = require('gulp-help')(require('gulp'));
var del = require('del');

var config = require('./../config.js');

// Cleaning task

gulp.task('clean', 'Delete `dist/` and `temp/` folders', del.bind(null, config.clean));