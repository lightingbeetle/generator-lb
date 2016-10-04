'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
<% if (includeBootstrap) { %>var replace = require('gulp-replace');<% } %>

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');

// Complie scss using libsass

gulp.task('styles', 'Compile Sass to CSS', function () {
  var dest = build.isBuild() ? config.styles.destBuild : config.styles.dest;

  return gulp.src(config.styles.src)
    <% if (includeBootstrap) { %>.pipe(replace('bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))<% } %>
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.write('.')))
    .pipe(sass(config.styles.sassCfg))
    .on('error', handleError)
    .pipe(postcss([
      autoprefixer(config.styles.autoprefixerCfg),
      build.isBuild() ? cssnano() : function() {}
    ]))
    .pipe(gulpif(config.sourceMaps && !build.isBuild(), sourcemaps.write('.')))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});
