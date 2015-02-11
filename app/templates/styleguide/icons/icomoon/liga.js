/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
	'use strict';
	function supportsProperty(p) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			i,
			div = document.createElement('div'),
			ret = p in div.style;
		if (!ret) {
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (i = 0; i < prefixes.length; i += 1) {
				ret = prefixes[i] + p in div.style;
				if (ret) {
					break;
				}
			}
		}
		return ret;
	}
	var icons;
	if (!supportsProperty('fontFeatureSettings')) {
		icons = {
			'chevronleft': '&#xf053c;',
			'chevronright': '&#xf054;',
			'chevronup': '&#xf077;',
			'chevrondown': '&#xf078;',
			'home': '&#xe600;',
			'edit': '&#xe601;',
			'calendar': '&#xe602;',
			'user': '&#xe603;',
			'settings': '&#xe604;',
			'download': '&#xe605;',
			'close': '&#xe606;',
			'check': '&#xe607;',
			'arrowup': '&#xe608;',
			'arrowright': '&#xe609;',
			'arrowdown': '&#xe60a;',
			'arrowleft': '&#xe60b;',
			'arrowcircleup': '&#xe60c;',
			'arrowcircleright': '&#xe60d;',
			'arrowcircledown': '&#xe60e;',
			'arrowcircleleft': '&#xe60f;',
			'googleplus': '&#xe610;',
			'facebook': '&#xe611;',
			'twitter': '&#xe612;',
			'youtube': '&#xe613;',
			'linkedin': '&#xe614;',
			'0': 0
		};
		delete icons['0'];
		window.icomoonLiga = function (els) {
			var classes,
				el,
				i,
				innerHTML,
				key;
			els = els || document.getElementsByTagName('*');
			if (!els.length) {
				els = [els];
			}
			for (i = 0; ; i += 1) {
				el = els[i];
				if (!el) {
					break;
				}
				classes = el.className;
				if (/icon-/.test(classes)) {
					innerHTML = el.innerHTML;
					if (innerHTML && innerHTML.length > 1) {
						for (key in icons) {
							if (icons.hasOwnProperty(key)) {
								innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
							}
						}
						el.innerHTML = innerHTML;
					}
				}
			}
		};
		window.icomoonLiga();
	}
}());