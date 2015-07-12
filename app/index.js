'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');
var Insight = require('insight');
var mkdir = require('mkdirp');

var ifFile = require('gulp-if');
var frep = require('gulp-frep');

function hasFeature(feat, features) {
  return features && features.indexOf(feat) !== -1;
}

var frepPatterns = [{
    // Remove empty first line
    pattern: /^[\s\t]*[\n\r]/,
    replacement: ''
  }, {
    // Normalize and condense newlines
    pattern: /^\s*$[\n\r]{2,}/gm,
    replacement: '\n'
  }
];

var insight;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.version = this.pkg.version;
    
    // CLeanup after templating
    // Probably not best solution...
    
    // cleanup .js files
    this.registerTransformStream(ifFile('*.js',
      frep(frepPatterns)
    ));
    
    // cleanup .scss files
    this.registerTransformStream(ifFile('*.scss',
      frep(frepPatterns)
    ));
    
    // cleanup .jade files
    this.registerTransformStream(ifFile('*.jade',
      frep(frepPatterns)
    ));
    
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(chalk.yellow(require('yosay')('Welcome to Lighting Beetle generator. Hodd luck!')));
    }
    
    insight = new Insight({
        // Google Analytics tracking code
        trackingCode: 'UA-27851629-19',
        pkg: this.pkg,
        version: this.version
    });
  },

  prompting: {
    askForAnalytics: function() {
      var done = this.async();
      if (insight.optOut === undefined) {
        insight.askPermission('May generator-lb anonymously report usage statistics to improve the tool over time?', function() {
          done();
        }.bind(this));
      } else {
        done();
      }
    },
    askForProjectName: function() {
      var done = this.async();
      
      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is name of your project?',
        default : this.appname // default is current folder
      }];
      
      this.prompt(prompts, function(props) {
        insight.track('install', 'start');

        this.projectName = props.name;
        this.projectNameSlug = _s.slugify(props.name);
        
        this.config.set('name', props.name);
        done();
      }.bind(this));
    },
    askForFeatures: function(){
      var done = this.async();
  
      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name: 'Frontend framework (Bootstrap/Foundation)',
          value: 'includeFEFramework',
          checked: false
        },{
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: false
        },{
          name: 'jQuery',
          value: 'includejQuery',
          checked: false
        },{
          name: 'Lighting Fly',
          value: 'includeLightingFly',
          checked: false
        }]
      }, {
        when: function (props) {
          return props.features.indexOf('includeFEFramework') !== -1;
        },
        type: 'list',
        name: 'feFramework',
        message: 'Please, choose frontend framework',
        choices: [{
          name: 'Bootstrap 3 (jQuery)',
          value: 'includeBootstrap'
        }, {
          name: 'Foundation 5 (jQuery2, Modernizr)',
          value: 'includeFoundation'
        }]
      }, {
        when: function (props) {
          return props.features.indexOf('includejQuery') !== -1;
        },
        type: 'list',
        name: 'jQuery',
        message: 'Please, choose jQuery version',
        choices: [{
          name: 'jQuery 2.x',
          value: 'includejQuery2'
        }, {
          name: 'jQuery 1.x',
          value: 'includejQuery1'
        }]
      }];
      
      this.prompt(prompts, function(props) {
        // set features of aplication
        
        this.features = props.features;
        
        this.includeModernizr = hasFeature('includeModernizr', props.features);
        this.includeLightingFly = hasFeature('includeLightingFly', props.features);  
        
        this.includejQuery1 = hasFeature('includejQuery1', props.jQuery);
        this.includejQuery2 = hasFeature('includejQuery2', props.jQuery);
        
        // set FE framework
        this.includeBootstrap = hasFeature('includeBootstrap', props.feFramework);
        this.includeFoundation = hasFeature('includeFoundation', props.feFramework);
        
        if (this.includeBootstrap) {
          if (this.includejQuery1 === false && this.includejQuery2 === false)  {
            this.includejQuery1 = false;
            this.includejQuery2 = true;
          }
        }
        
        if (this.includeFoundation) {
          this.includejQuery1 = false;
          this.includejQuery2 = true;
          this.includeModernizr = true;
        }
        
        this.config.set('features', props.features);
        this.config.set('jQuery', props.jQuery);
        this.config.set('feFramework', props.feFramework);
        
        insight.track('modernizr', this.includeModernizr);
        insight.track('lightingFly', this.includeLightingFly);
        insight.track('jQuery1', this.includejQuery1);
        insight.track('jQuery2', this.includejQuery2);
        
        if (props.feFramework) {
          insight.track('bootstrap', this.includeBootstrap);
          insight.track('foundation', this.includeFoundation);
        }
        
        done();
      }.bind(this));
    },
    askForSassCompilator: function() {
      var done = this.async();
      
      var prompts = [{
        type: 'list',
        name: 'sassCompilator',
        message: 'What SASS compilator do you want to use?',
        choices: [{
          name: 'Compass - Ruby',
          value: 'rubySass',
        },{
          name: 'LibSass - Node.js',
          value: 'libSass',
        }],
        default: 0
      }];
      
      this.prompt(prompts, function(props) {
        
        this.includeRubySass = hasFeature('rubySass', props.sassCompilator);
        this.includeLibSass = hasFeature('libSass', props.sassCompilator);
        
        insight.track('sass', props.sassCompilator);
        
        this.config.set('sassCompilator', props.sassCompilator);
        
        done();
      }.bind(this));
    },
    askForES6: function() {
      var done = this.async();
      
      var prompts = [{
        type: 'confirm',
        name: 'includeES6',
        message: 'Do you want to use ES6 with Babel transpiler?',
        default: true
      }];
      
      this.prompt(prompts, function(props) {
        //testing framework
        this.includeES6 = props.includeES6;
        
        insight.track('ES6', props.includeES6);
        
        this.config.set('ES6', props.includeES6);
        
        done();
      }.bind(this));
    },
    askForMultiLanguage: function() {
      var done = this.async();
      
      var prompts = [{
        type: 'confirm',
        name: 'includeMultiLanguage',
        message: 'Do you want support for multi-language templates?',
        default: false
      }];
      
      this.prompt(prompts, function(props) {
        //testing framework
        this.includeMultiLanguage = props.includeMultiLanguage;
        
        insight.track('multiLanguage', props.includeMultiLanguage);
        
        this.config.set('multiLanguage', props.includeMultiLanguage);
        
        done();
      }.bind(this));
    },
    askForTestFramework: function() {
      var done = this.async();
      
      var prompts = [{
        type: 'confirm',
        name: 'includeTestFramework',
        message: 'Do you want include front-end testing (Mocha)?',
        default: false
      }];
      
      this.prompt(prompts, function(props) {
        //testing framework
        this.includeTestFramework = props.includeTestFramework;
        
        if (this.includeTestFramework) {
          // setup the test-framework property, Gruntfile template will need this
          this.option('test-framework', {
            desc: 'Test framework to be invoked',
            type: String,
            defaults: 'mocha'
          });
          this.testFramework = this.options['test-framework'];
        }
        
        insight.track('testFramework', props.includeTestFramework);
        
        this.config.set('testFramework', props.includeTestFramework);
        
        done();
      }.bind(this));
    }
  },
  configuring: function() {
    this.config.save();
  },
  writing: {
    gulp: function () {
      this.copy('_gulpfile.js','gulpfile.js');
      
      this.copy('gulp/tasks/_browserSync.js', 'gulp/tasks/browserSync.js');
      this.copy('gulp/tasks/_clean.js', 'gulp/tasks/clean.js');
      this.copy('gulp/tasks/_default.js', 'gulp/tasks/default.js');
      this.copy('gulp/tasks/_deploy.js', 'gulp/tasks/deploy.js');
      this.copy('gulp/tasks/_images.js', 'gulp/tasks/images.js');
      this.copy('gulp/tasks/_templates.js', 'gulp/tasks/templates.js');
      this.copy('gulp/tasks/_watch.js', 'gulp/tasks/watch.js');
      
      this.copy('gulp/utils/_buildHelper.js', 'gulp/utils/buildHelper.js');
      this.copy('gulp/utils/_handleError.js', 'gulp/utils/handleError.js');
      this.copy('gulp/utils/_jsHintErrorReporter.js', 'gulp/utils/jsHintErrorReporter.js');
      
      this.template('gulp/_config.js', 'gulp/config.js');
      
      this.template('gulp/tasks/_build.js', 'gulp/tasks/build.js');
      this.template('gulp/tasks/_copy.js', 'gulp/tasks/copy.js');
      this.template('gulp/tasks/_serve.js', 'gulp/tasks/serve.js');
      this.template('gulp/tasks/_scripts.js', 'gulp/tasks/scripts.js');
      this.template('gulp/tasks/_styles.js', 'gulp/tasks/styles.js');
      this.template('gulp/tasks/_wiredep.js', 'gulp/tasks/wiredep.js');
      
      
      if (this.includeModernizr) { 
        this.copy('gulp/tasks/_modernizr.js', 'gulp/tasks/modernizr.js');
      }
    },

    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },
    
    readme : function() {
      this.template('_readme.md', 'readme.md');
    },

    git: function () {
      this.template('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    bower: function () {
      var bower = {
        name: this.projectNameSlug,
        private: true,
        dependencies: {}
      };

      if (this.includeBootstrap) {
        bower.dependencies['bootstrap-sass'] = '~3.3.4';
      }

      if (this.includeFoundation) {
        bower.dependencies.foundation = 'zurb/bower-foundation#~5.5.1';
      }

      if (this.includejQuery1) {
        bower.dependencies.jquery = '~1.11.2';
      }
      
      if (this.includejQuery2) {
        bower.dependencies.jquery = '~2.1.3';
      }
      
      if (this.includeLightingFly) {
        bower.dependencies.lightingfly = '~0.2.1';
      }
      
      mkdir('bower_components');
      this.write('bower.json', JSON.stringify(bower, null, 2));
    },
    
    env: function(){
      this.copy('env', '.env');
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },

    mainStylesheet: function () {
      this.template('styles/_main.scss', 'app/styles/main.scss');
    },

    jade : function () {
      this.template('views/_index.jade', 'app/views/index.jade');
      this.template('views/layouts/_default.jade', 'app/views/layouts/_default.jade');
      this.template('views/modules/_header.jade', 'app/views/modules/_header.jade');
      this.template('views/modules/_footer.jade', 'app/views/modules/_footer.jade');
      this.template('views/data/_index.json','app/views/data/index.json');
      if (this.includeMultiLanguage) {
        this.copy('views/mixins/_language.jade','app/views/mixins/_language.jade');
      }
    },

    js : function () {
      this.directory('app');
      this.template('scripts/_main.js', 'app/scripts/main.js');
    },

    app: function () {
      this.directory('app');
      mkdir('app/scripts');
      mkdir('app/styles');
      mkdir('app/images');
      mkdir('app/icons');
      mkdir('app/fonts');
      mkdir('app/styles/modules');
      mkdir('app/scripts/plugins');
      mkdir('app/scripts/modules');
    }
  },

  install: function () {
    
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install'],
        callback: function () {
          this.log(chalk.green('All done, hodd luck!'));
          insight.track('install', 'done');
        }.bind(this)
      });
    } else {
      insight.track('install', 'skip-install');
    }
    
    this.on('end', function () {
      if (this.includeTestFramework) {
        this.invoke(this.options['test-framework'], {
          options: {
            'skip-message': this.options['skip-install-message'],
            'skip-install': this.options['skip-install']
          }
        });
      }
    });
  }
});
