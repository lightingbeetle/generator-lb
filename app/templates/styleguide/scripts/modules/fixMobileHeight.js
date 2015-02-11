// ----------------------------
// fixMobileHeight

'use strict';

var myApp = myApp || {};

myApp.fixMobileHeight = (function($, getViewport) {
  var _element = $('.style-guide-header');
  var _viewport = getViewport().height;
  
  function init() {
    _binds();
    _doResize();
  }
  
  function _binds() {
    var didResize;

    $(window).on('resize', function(){
      didResize = true;
    });

    setInterval(function(){
      if(didResize) {
        var newViewport = getViewport().height;

        if(Math.abs(_viewport - newViewport) > 70) {
          _doResize();
        }
        
        _viewport = newViewport;
        didResize = false;
      }
    }, 250);
  }
  
  function _doResize() {
    _element.css('height', (getViewport().height));
  }
  
  return {
    init : init
  };
  
})(jQuery, myApp.getViewport);