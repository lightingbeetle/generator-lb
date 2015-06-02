'use strict';
<% if (includeMultiLanguage) { %>var path = require('path');<% } %>

var gulp = require('gulp-help')(require('gulp'));
var jade = require('gulp-jade');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');
<% if (includeMultiLanguage) { %>var merge = require('merge-stream');<% } %>

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');


// Compile jade to html

gulp.task('jade', 'Compile Jade templates',['jade:prepareData'], function() {
  <% if (!includeMultiLanguage) { %>return gulp.src(config.jade.src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(config.jadeData.dataPath));
    }))
    .pipe(jade(config.jade.cfg))
    .pipe(gulp.dest(config.jade.dest));
  <% } else { %>  
  var languages = config.jade.languages.list.map(function(lang) {
    return gulp.src(config.jade.src)
      .pipe(plumber(handleError))
      .pipe(data(function() {
        var json = JSON.parse(fs.readFileSync(config.jadeData.dataPath));
        json.language = lang;
        json.primaryLanguage = config.jade.languages.primary;
        return json;
      }))
      .pipe(jade(config.jade.cfg))
      .pipe((config.jade.languages.primary === lang) ? gulp.dest(config.jade.dest) : gulp.dest(path.join(config.jade.dest, lang)));
  });
  
  return merge(languages);<% } %>
});

// Concat *.json file to single data.json

gulp.task('jade:prepareData', 'Merge views data', function() {
  return gulp.src(config.jadeData.src)
    .pipe(extend(config.jadeData.dataName))
    .pipe(gulp.dest(config.jadeData.dest));
});