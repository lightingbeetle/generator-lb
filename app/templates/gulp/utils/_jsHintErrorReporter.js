'use strict';

var gutil = require('gulp-util');

var map = require('map-stream');
var events = require('events');
var emmitter = new events.EventEmitter();

// Custom reporter for error emiting to error handler

module.exports = function() {
  return map(function (file, cb) {
    if (!file.jshint.success) {
      
      // Build message
      // TODO improve error message
      
      var err = new gutil.PluginError({
        plugin: 'JSHint',
        message: 'There where one or more errors.'
      });

      // Emit this error event
      emmitter.emit('error',err);
    }
    cb(null, file);
  });
};
