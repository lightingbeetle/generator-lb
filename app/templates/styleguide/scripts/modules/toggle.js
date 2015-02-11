// ---------------------------------------------------
// Toggle
// global object fot handling Toggle

'use strict';

var myApp = myApp || {};

myApp.toggle = (function($) {
  var _$elements = $('.js-toggle');
  var _$dropdown = null;
  var _$toggle = null;
  
  // Bind events to elements
  function _binds() {
    _$elements.off('click');
    _$elements.on('click', function(e){
      _doToggle($(this));
      $(document).trigger('toggle-click');
      e.stopPropagation();
    });
    
    // if it's dropdown hide when click outside
    $(document).on('click bootstrap-click', function() {
      if (_$dropdown) {
        $('dropdown-toggle.open').trigger('click');
        hide();
      }
    });
    
    // if it's hide when esc
    $(document).on('keydown', function(e) {
      if (_$dropdown && e.keyCode === 27) {
        hide();
      }
    });
  }
  
  // Perform toggle
  function _doToggle($toggle) {
    var $target;

    if($toggle.data('target') === 'parent') {
      $target = $($toggle.parent());
    } else {
      $target = $($toggle.data('target'));
    }

    if(_$dropdown && !_$dropdown.is($target)) {
      hide();
    }
    
    /*jshint -W030 */
    $target.is('.active') ? hide($target, $toggle) : show($target, $toggle);
  }
  
  // Toggle icon from data-toggle-icon attribute
  function _toggleIcon($toggle) {
    if($toggle.data('toggle-icon')) {

      var oldIcon = ($toggle.find('.icon').text());
      var newIcon = ($toggle.attr('data-toggle-icon'));

      $toggle.find('.icon').text(newIcon);
      $toggle.attr('data-toggle-icon', oldIcon);
    }
  }
  
  // Toggle text from data-toggle-text attribute
  function _toggleText($toggle) {
    if($toggle.data('toggle-text')) {

      var oldText = $toggle.text();
      var newText = $toggle.attr('data-toggle-text');

      $toggle.text(newText);
      $toggle.attr('data-toggle-text', oldText);
    }
  }
  
  function init(target) {
    if (target) { _$elements = $(target); }
    
    _binds();
  } 
  
  // Show $target with click on $toggle 
  function show($target, $toggle){
    
    if($toggle.data('toggle') === 'dropdown') {
      _$dropdown = $target;
      _$toggle = $toggle;
    }

    (_$dropdown || $target).addClass('active');
    (_$toggle || $toggle).addClass('active');
    
    _toggleIcon(_$toggle || $toggle);
    _toggleText(_$toggle || $toggle);
  }
  
  // Hide $target with click on $toggle 
  function hide($target, $toggle) {
    (_$dropdown || $target).removeClass('active');
    (_$toggle || $toggle).removeClass('active');
    
    _toggleIcon(_$toggle || $toggle);
    _toggleText(_$toggle || $toggle);

    _$dropdown = null;
    _$toggle = null;
  }
  
  // Public API
  return {
    init : init,
    show : show,
    hide : hide,
  };
  
})(jQuery);
