'use strict';

var notify = require('gulp-notify');
var gutil = require('gulp-util');
var argv = require('yargs').argv;

var build = require('./buildHelper.js');


module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  notify.onError({
    title: '<%%= error.plugin %>',
    message: '<%%= error.message %>'
  }).apply(this, args);
  
  // End process in build task
  // Use gulp build --force to override
  if (build.isBuild() && !argv.force) {
    gutil.log(gutil.colors.red('There was an error in building process!'));
    process.exit(1); 
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};
