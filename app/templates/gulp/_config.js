'use strict';
var path = require('path');
var modRewrite = require('connect-modrewrite');

// Default settings
module.exports.uglifyJs = process.env.UGLIFYJS || true; // to remove .min sufix edit template manually
module.exports.minifyCss = process.env.MINIFYCSS || true; // to remove .min sufix edit template manually
module.exports.cacheBust = process.env.CACHEBUST || true;
module.exports.optimizeImages = process.env.OPTIMIZEIMAGES || true;
module.exports.lintJs = process.env.LINTJS || true;
module.exports.sourceMaps = process.env.SOURCEMAPS || true;

// Default paths
var app = 'app';
var tmp = '.tmp';
var dist = 'dist';
var nodeDir = 'node_modules';

// Default paths in app folder
var data = 'data';
var fonts = 'fonts';
var icons = 'icons';
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

// Rewrite rules enables removing .html extensions in development.
// This are possible routes for same test.html file:
// http://localhost:3000/test.html
// http://localhost:3000/test
var rewriteRules = [
  '^/$ - [L]', // default site root handling (index.html)
  '.html$ - [L]', // ignore routes ends with '.html'
  '(.*)/$ $1/index.html [L]', // routes with trailing slash are directories -> rewrite to directory index.html
  '\\/\[a-zA-Z0-9_\\-\@.]+\\.\[a-zA-Z0-9]+$ - [L]', // ignore files with extension (eg. .css, .js, ...)
  '(.*)$ $1.html [L]' // redirect routes ends with string without trailing slash to original html
];

// Browser sync task config
module.exports.browserSync = {
  dev: {
    server: {
      baseDir: [tmp, app],
      routes: {
        '/node_modules': nodeDir
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
  },
  dist: {
    server: {
      baseDir: dist
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
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
  src: [
    path.join(app, fonts, '**/*')<% if (includeBootstrap) { %>, 'node_modules/bootstrap-sass/assets/fonts/**/*'<% } %>
  ],
  dest: path.join(dist, fonts)
};

// Copy fonts task config
module.exports.copyIcons = {
  src: path.join(app, icons, '**/*'),
  dest: dist + '/icons'
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
  src: path.join(app, images, '**/*.{gif,png,jpg}'),
  srcSVG: path.join(app, images, '**/*.svg'),
  dest: dist + '/images',
  cfg: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  }
};

// JSHint task config
module.exports.eslint = {
  src: [
    path.join(app, scripts,'**/*.js'), 
    path.join('!' + app, scripts,'plugins/**/*.js') // do not lint external plugins
  ]
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

// Cachebusting task config
module.exports.rev = {
  srcFiles: [
    path.join(dist, '**/*.css'),
    path.join(dist, '**/*.js'),
  ],
  srcHtml: path.join(dist, '**/*.html'),
  manifestPath: path.join(dist, 'rev-manifest.json'),
  dest: path.join(dist),
}

// User scripts task
module.exports.scripts = {
  src: path.join(app, scripts, '*.js'),
  dest: path.join(tmp, scripts),
  rollupCfg: {
    format: 'iife',
    moduleName: '<%= projectNameSlug %>',
  },
  destBuild: path.join(dist, scripts)
};

// Styles task config
module.exports.styles = {
  src: path.join(app, styles, '*.scss'),
  dest: path.join(tmp,styles),
  destBuild: path.join(dist, styles),
  sassCfg: <% if (includeRubySass) { %>{
    sourcemap: true,
    style: 'expanded',
    lineNumbers: true
  }, <% } else if (includeLibSass) { %>{
    includePaths: 'node_modules',
    outputStyle: 'expanded'
  }, <% } %>
  autoprefixerCfg: {
    browsers: ['last 2 version']
  }
};

// Templates task config
module.exports.templates = {
  <% if (includeMultiLanguage) { %>languages: languages,<% } %>
  src: path.join(app, views, '*.jade'),
  dest: tmp,
  destBuild: path.join(dist),
  cfg: {
    pretty: true,
    compileDebug: true
  }
};

// TemplatesData task config
module.exports.templatesData = {
  src: path.join(app, views, data, '/**/*.<% if (includeDataYAML) { %>yaml<% } else { %>json<% } %>'),
  dest: path.join(tmp, '/data'),
  dataName: 'data.<% if (includeDataYAML) { %>yaml<% } else { %>json<% } %>',
  dataPath: path.join(tmp, 'data/data.<% if (includeDataYAML) { %>yaml<% } else { %>json<% } %>')
};

// Watch task config
module.exports.watch = {
  styles: path.join(app, styles, '/**/*.scss'),
  jade: [
    path.join(app, views, '/**/*.jade'), 
    path.join(app, views, data, '/**/*.<% if (includeDataYAML) { %>yaml<% } else { %>json<% } %>')
  ],
  scripts: path.join(app, scripts, '/**/*.js')
};
