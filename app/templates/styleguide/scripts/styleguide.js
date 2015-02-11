// This is styleguide specific behavior
'use strict';

var myApp = myApp || {};

$(document).ready(function(){
  myApp.toggle.init();
  $('.js-select').selectpicker();
  
  if(Modernizr.touch) { 
    myApp.fixMobileHeight.init();
  }
  
});
