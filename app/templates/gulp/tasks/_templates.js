'use strict';
<% if (includeMultiLanguage) { %>var path = require('path');<% } %>

var gulp = require('gulp-help')(require('gulp'));
var jade = require('gulp-jade');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
<% if (includeMultiLanguage) { %>var merge = require('merge-stream');<% } %>

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');

// Compile jade to html

gulp.task('templates', 'Compile Jade templates', ['jade:prepareData', 'useref'], function() {
  var src = build.isBuild() ? config.jade.srcBuild : config.jade.src;
  var dest = build.isBuild() ? config.jade.destBuild : config.jade.dest;
  
  <% if (!includeMultiLanguage) { %>return gulp.src(src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(config.jadeData.dataPath));
    }))
    .pipe(jade(config.jade.cfg))
    .pipe(gulp.dest(dest));
  <% } else { %>  
  var languages = config.jade.languages.list.map(function(lang) {
    return gulp.src(src)
      .pipe(plumber(handleError))
      .pipe(data(function() {
        var json = JSON.parse(fs.readFileSync(config.jadeData.dataPath));
        json.language = lang;
        json.primaryLanguage = config.jade.languages.primary;
        return json;
      }))
      .pipe(jade(config.jade.cfg))
      .pipe((config.jade.languages.primary === lang) ? gulp.dest(dest) : gulp.dest(dest, lang)));
  });
  
  return merge(languages);<% } %>
});

// Concat *.json file to single data.json

gulp.task('jade:prepareData', 'Merge views data', function() {
  return gulp.src(config.jadeData.src)
    .pipe(extend(config.jadeData.dataName))
    .pipe(gulp.dest(config.jadeData.dest));
});

// Bundle css and js based on build tags in Jade templates

gulp.task('useref', 'Bundle CSS and JS based on build tags and copy to `dist/` folder', function () {
  // run useref only in build
  if (build.isBuild) {
    var assets = useref.assets(config.useref.assetsCfg);
    
    var jadeFilesOnly = filter(['**/*.jade']);
    var excludeJade = filter(['**','!**/*.jade']);
    
    return gulp.src(config.useref.src)
      .pipe(assets)
      .pipe(gulpif('*.js', gulpif(config.uglifyJs, uglify()))) // uglify JS
      .pipe(gulpif('*.css', gulpif(config.minifyCss, minifyCss()))) // minify CSS
      .pipe(gulpif(config.cacheBust, rev()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulpif(config.cacheBust, revReplace({replaceInExtensions: ['.jade', '.css', '.js']})))
      .pipe(jadeFilesOnly)
      .pipe(gulp.dest(config.useref.destJade))
      .pipe(jadeFilesOnly.restore())
      .pipe(excludeJade)
      .pipe(gulp.dest(config.useref.dest))
      .pipe(gulpif(config.cacheBust, rev.manifest(config.useref.revManifestCfg))) // create rev-manifest.json 
      .pipe(gulp.dest(config.useref.dest));
  } else {
    return;
  }
});