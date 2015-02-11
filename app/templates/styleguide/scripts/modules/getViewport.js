'use strict';
var myApp = myApp || {};
  
myApp.getViewport = (function() {
  
  function getViewport() {
    var viewport = {
      'width': 0,
      'height': 0
    };

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth !== 'undefined') {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;

    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (
      typeof document.documentElement !== 'undefined' &&
      typeof document.documentElement.clientWidth !== 'undefined' && 
      document.documentElement.clientWidth !== 0
    ) {
      viewport.width = document.documentElement.clientWidth;
      viewport.height = document.documentElement.clientHeight;
    }

    // older versions of IE
    else {
      viewport.width = document.getElementsByTagName('body')[0].clientWidth;
      viewport.height = document.getElementsByTagName('body')[0].clientHeight;
    }

    return viewport;
  }
  
  return getViewport;
  
})();