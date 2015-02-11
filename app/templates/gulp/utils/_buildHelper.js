'use strict';

var build = false;

var isBuild = function() {
  return build;
};

var setBuild = function(arg) {
  build = arg;
};

module.exports = {
  isBuild : isBuild,
  setBuild : setBuild
};