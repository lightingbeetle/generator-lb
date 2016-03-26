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
var cssnano = require('gulp-cssnano');
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

// Compile jade to html

gulp.task('templates', 'Compile templates', ['templates:prepareData', 'useref'], function() {
  var src = build.isBuild() ? config.templates.srcBuild : config.templates.src;
  var dest = build.isBuild() ? config.templates.destBuild : config.templates.dest;
  
  <% if (!includeMultiLanguage) { %>return gulp.src(src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      <% if (includeDataYAML) { %>return yaml.safeLoad(fs.readFileSync(config.templatesData.dataPath, 'utf8'));
      <% } else { %> return JSON.parse(fs.readFileSync(config.templatesData.dataPath));<% } %>
    }))
    .pipe(jade(config.templates.cfg))
    .pipe(gulp.dest(dest));
  <% } else { %>  
  var languages = config.templates.languages.list.map(function(lang) {
    return gulp.src(src)
      .pipe(plumber(handleError))
      .pipe(data(function() {
        <% if (includeDataYAML) { %>var json = yaml.safeLoad(fs.readFileSync(config.templatesData.dataPath, 'utf8'));
        <% } else { %> var json = JSON.parse(fs.readFileSync(config.templatesData.dataPath));<% } %>
        json.language = lang;
        json.primaryLanguage = config.templates.languages.primary;
        return json;
      }))
      .pipe(jade(config.templates.cfg))
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

// Bundle css and js based on build tags in Jade templates

gulp.task('useref', 'Bundle CSS and JS based on build tags and copy to `dist/` folder', function () {
  // run useref only in build
  if (build.isBuild()) {
    
    var jadeFilesOnly = filter(['**/*.jade'], {restore: true});
    var excludeJade = filter(['**','!**/*.jade']);
    
    return gulp.src(config.useref.src)
      .pipe(useref())
      .pipe(gulpif('*.js', gulpif(config.uglifyJs, uglify()))) // uglify JS
      .pipe(gulpif('*.css', gulpif(config.minifyCss, cssnano()))) // minify CSS
      .pipe(gulpif('!**/*.jade',gulpif(config.cacheBust, rev())))
      .pipe(gulpif(config.cacheBust, revReplace({replaceInExtensions: ['.jade', '.css', '.js']})))
      .pipe(jadeFilesOnly)
      .pipe(gulp.dest(config.useref.destJade))
      .pipe(jadeFilesOnly.restore)
      .pipe(excludeJade)
      .pipe(gulp.dest(config.useref.dest))
      .pipe(gulpif(config.cacheBust, rev.manifest(config.useref.revManifestCfg))) // create rev-manifest.json 
      .pipe(gulp.dest(config.useref.dest));
  } else {
    return;
  }
});