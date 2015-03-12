'use strict';

var gulp = require('gulp');
<% if (includeRubySass) { %>var rubySass = require('gulp-ruby-sass');<% } %><% if (includeLibSass) { %>var sass = require('gulp-sass');<% } %>
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');

<% if (includeRubySass) { %>
// Compile scss using ruby sass

gulp.task('styles', function () {
  return rubySass(config.styles.src, config.styles.sassCfg)
    // Error emiting from sass not working right now
    // with plumber or without
    .pipe(plumber(handleError))
    //.on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.styles.autoprefixerCfg))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true, once:true}));
});
<% } %><% if (includeLibSass) { %>
// Complie scss using libsass

gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.styles.sassCfg))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.styles.autoprefixerCfg))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true, once:true}));
}); 
<% } %>