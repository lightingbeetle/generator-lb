'use strict';
var path = require('path');

// Default paths
var app = 'app';
var tmp = '.tmp';
var dist = 'dist';
var bowerDir = 'bower_components';

// Default paths in app folder
var data = 'data';
var fonts = 'fonts';
var images = 'images';
var scripts = 'scripts';
var styles = 'styles';
var views = 'views';

<% if (includeMultiLanguage) { %>
var languages = {
  list: ['en', 'de', 'sk'],
  primary: 'en'
};
<% } %>

// Default settings
module.exports.uglifyJs = true; // to remove .min sufix edit template manually
module.exports.minifyCss = true; // to remove .min sufix edit template manually
module.exports.cacheBust = true;
module.exports.optimizeImages = true;
module.exports.lintJs = true;

// Browser sync task config
module.exports.browserSync = {
  dev: {
    server: {
      baseDir: [tmp, app],
      routes: {
        '/bower_components': bowerDir
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost'
  },
  dist: {
    server: {
      baseDir: dist
    },
    notify: false,
    debugInfo: false,
    host: 'localhost'
  }
};

// Build size task config
module.exports.buildSize = {
  srcAll: dist + '/**/*',
  cfgAll: {
    title: 'build', 
    gzip: true
  },
  srcCss: path.join(dist, styles, '/**/*'),
  cfgCss: {
    title: 'CSS', 
    gzip: true
  },
  srcJs: path.join(dist, scripts, '/**/*'),
  cfgJs: {
    title: 'JS', 
    gzip: true
  },
  srcImages: path.join(dist, images, '/**/*'),
  cfgImages: {
    title: 'Images', 
    gzip: false
  }
};

// Clean task config
// Be carefull what you cleaning!
module.exports.clean = [tmp, dist];

// Copy fonts task config
module.exports.copyFonts = {
  src: path.join(app, fonts, '**/*'),
  dest: dist + '/fonts'
};

// Copy extras task config
module.exports.copyExtras = {
  src: [
    app + '/*.*',
    '!' + app + '/*.html'
  ],
  dest: dist,
  cfg: {
    dot: true
  }
};

// Deploy task config
// FTP settings are in .env file
module.exports.deploy = {
  src: dist + '/**',
  dev: {
    root: dist,
    hostname: process.env.FTP_DEV_HOSTNAME,
    username: process.env.FTP_DEV_USER,
    destination: process.env.FTP_DEV_DEST
  },
  dist: {
    root: dist,
    hostname: process.env.FTP_DIST_HOSTNAME,
    username: process.env.FTP_DIST_USER,
    destination: process.env.FTP_DIST_DEST
  }
};

// Images task config
module.exports.images = {
  src: path.join(app, images, '**/*'),
  dest: dist + '/images',
  cfg: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  }
};

// Jade task config
module.exports.jade = {
  <% if (includeMultiLanguage) { %>languages: languages,<% } %>
  src: path.join(app, views, '*.jade'),
  dest: tmp,
  cfg: {
    pretty: true,
    compileDebug: false
  }
};

// JadeData task config
module.exports.jadeData = {
  src: path.join(app, views, data, '/**/*.json'),
  dest: app + '/views',
  dataName: 'data.json',
  dataPath: path.join(app, views, 'data.json')
};

// JSHint task config
module.exports.jshint = {
  src: [
    path.join(app, scripts,'**/*.js'), 
    path.join('!' + app, scripts,'plugins/**/*.js') // do not lint external plugins
  ],
  reporter: require('jshint-stylish')
};

<% if (includeModernizr) { %>
// Modernizr task config
module.exports.modernizr = {
  src: [ 
    path.join(app, scripts,'**/*.js'),
    path.join(tmp, styles,'*.css')
  ],
  dest: path.join(tmp, scripts, 'plugins'),
  cfg: {
    silent: true,
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ]
  }
};
<% } %>

// User scripts task
module.exports.scripts = {
  src: [
    path.join(app, scripts, '*.js'),
    path.join(app, scripts, 'modules/**/*.js')
  ],
  dest: path.join(tmp, scripts)
};

// Styles task config
module.exports.styles = {
  src: path.join(app, styles, 'main.scss'),
  dest: path.join(tmp,styles),
  sassCfg: <% if (includeRubySass) { %>{
    sourcemap: true,
    style: 'expanded',
    lineNumbers: true,
    container: '<%= projectNameSlug %>'
  }, <% } else if (includeLibSass) { %>{}, <% } %>
  autoprefixerCfg: {browsers: ['last 2 version']}
};

module.exports.useref = {
  src: tmp + '/**/*.html',
  dest: dist,
  assetsCfg: {
    searchPath : app
  },
  revManifestCfg: {merge: true}
};

// Watch task config
module.exports.watch = {
  styles: path.join(app, styles, '/**/*.scss'),
  jade: [
    path.join(app, views, '/**/*.jade'), 
    path.join(app, views, data, '/**/*.json')
  ],
  scripts: path.join(app, scripts, '/**/*.js'),
  wiredep: 'bower.json' 
};

// Wiredep task config
module.exports.wiredep = {
  sass: {
    src: path.join(app, styles, '/*.scss'),
    dest: path.join(app, styles),
    cfg: {
      ignorePath: '',
      overides: {}
    }
  },
  jade: {
    src: path.join(app, views, '/layouts/*.jade'),
    dest: path.join(app, views, '/layouts'),
    cfg: {
      exclude: ['modernizr'],
      ignorePath: '../../',
      overides: {}
    }
  } 
}