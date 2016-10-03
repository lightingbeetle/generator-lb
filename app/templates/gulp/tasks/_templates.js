'use strict';
<% if (includeMultiLanguage) { %>var path = require('path');<% } %>

var gulp = require('gulp-help')(require('gulp'));
var pug = require('gulp-pug');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
<% if (includeMultiLanguage) { %>var merge = require('merge-stream');<% } %>

<% if (includeDataYAML) { %>var yamlMerge = require('gulp-yaml-merge');
var yaml = require('js-yaml');<% } %>

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');

// Compile pug to html

gulp.task('templates', 'Compile templates', ['templates:prepareData'], function() {
  var dest = build.isBuild() ? config.templates.destBuild : config.templates.dest;
  
  <% if (!includeMultiLanguage) { %>return gulp.src(config.templates.src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      <% if (includeDataYAML) { %>return yaml.safeLoad(fs.readFileSync(config.templatesData.dataPath, 'utf8'));
      <% } else { %> return JSON.parse(fs.readFileSync(config.templatesData.dataPath));<% } %>
    }))
    .pipe(pug(config.templates.cfg))
    .pipe(gulp.dest(dest));
  <% } else { %>  
  var languages = config.templates.languages.list.map(function(lang) {
    return gulp.src(config.templates.src)
      .pipe(plumber(handleError))
      .pipe(data(function() {
        <% if (includeDataYAML) { %>var json = yaml.safeLoad(fs.readFileSync(config.templatesData.dataPath, 'utf8'));
        <% } else { %> var json = JSON.parse(fs.readFileSync(config.templatesData.dataPath));<% } %>
        json.language = lang;
        json.primaryLanguage = config.templates.languages.primary;
        return json;
      }))
      .pipe(pug(config.templates.cfg))
      .pipe((config.templates.languages.primary === lang) ? gulp.dest(dest) : gulp.dest(path.join(dest, lang)));
  });
  
  return merge(languages);<% } %>
});

// Concat *.json file to single data.json

gulp.task('templates:prepareData', 'Merge views data', function() {
  return gulp.src(config.templatesData.src)
    <% if (includeDataYAML) { %>.pipe(yamlMerge(config.templatesData.dataName))
    <% } else { %>.pipe(extend(config.templatesData.dataName))<% } %>
    .pipe(gulp.dest(config.templatesData.dest));
});
