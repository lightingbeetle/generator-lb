'use strict';

var gulp = require('gulp');
var del = require('del');

// Cleaning task

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));