'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
    this.version = this.pkg.version;
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(chalk.yellow(require('yosay')('Welcome to Lighting Beetle generator. Hodd luck!')));
    }

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is name of your project?',
      default : this.appname // default is current folder
    }, {
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
      },
      ]
    }, {
      when: function (answers) {
        return answers.features.indexOf('includeFEFramework') !== -1;
      },
      type: 'list',
      name: 'feFramework',
      message: 'Please, choose frontend framework',
      choices: [{
        name: 'Bootstrap 3 (jQuery)',
        value: 'includeBootstrap'
      }, {
        name: 'Foundation 5 (jQuery, Modernizr)',
        value: 'includeFoundation'
      }
      ]
    }, {
      type: 'list',
      name: 'sassCompilator',
      message: 'What SASS compilator do you want to use?',
      choices: [{
        name: 'Compass - Ruby',
        value: 'includeRubySass',
      },{
        name: 'LibSass - Node.js',
        value: 'includeLibSass',
      }],
      default: 0
    }, {
      type: 'confirm',
      name: 'includeTestFramework',
      message: 'Do you want include front-end testing (Mocha)?',
      default: false
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;
      var sassCompilator = answers.sassCompilator;
      var feFramework = answers.feFramework;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      // set application name
      this.projectName = answers.name;

      // set features of aplication
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includejQuery = hasFeature('includejQuery');
      this.includeLightingFly = hasFeature('includeLightingFly');

      // set Bitbucket username
      this.gitName = answers.gitName;

      // set FE framework
      this.includeBootstrap = false;
      this.includeFoundation = false;
      switch(feFramework) {
        case 'includeBootstrap':
          this.includeBootstrap = true;
          this.includejQuery = true;
          break;
        case 'includeFoundation':
          this.includeFoundation = true;
          this.includejQuery = true;
          this.includeModernizr = true;
          break;;
      }

      // set SASS compilator
      switch(sassCompilator) {
        case 'includeRubySass':
          this.includeRubySass = true;
          this.includeLibSass = false;
          break;
        case 'includeLibSass':
          this.includeRubySass = false;
          this.includeLibSass = true;
          break;
        default:
          this.includeRubySass = true;
          this.includeLibSass = false;
      }

      //testing framework
      this.includeTestFramework = answers.includeTestFramework;
      if (this.includeTestFramework) {
        // setup the test-framework property, Gruntfile template will need this
        this.option('test-framework', {
          desc: 'Test framework to be invoked',
          type: String,
          defaults: 'mocha'
        });
        this.testFramework = this.options['test-framework'];
      }
      this.config.save();
      done();
    }.bind(this));
  },

  gulp: function () {
    this.copy('_gulpfile.js','gulpfile.js');
    
    this.copy('gulp/tasks/_browserSync.js', 'gulp/tasks/browserSync.js');
    this.copy('gulp/tasks/_buildSize.js', 'gulp/tasks/buildSize.js');
    this.copy('gulp/tasks/_clean.js', 'gulp/tasks/clean.js');
    this.copy('gulp/tasks/_deploy.js', 'gulp/tasks/deploy.js');
    this.copy('gulp/tasks/_extras.js', 'gulp/tasks/extras.js');
    this.copy('gulp/tasks/_fonts.js', 'gulp/tasks/fonts.js');
    this.copy('gulp/tasks/_images.js', 'gulp/tasks/images.js');
    this.copy('gulp/tasks/_jade.js', 'gulp/tasks/jade.js');
    this.copy('gulp/tasks/_jshint.js', 'gulp/tasks/jshint.js');
    this.copy('gulp/tasks/_browserSync.js', 'gulp/tasks/browserSync.js');
    this.copy('gulp/tasks/_useref.js', 'gulp/tasks/useref.js');
    this.copy('gulp/tasks/_watch.js', 'gulp/tasks/watch.js');
    
    this.copy('gulp/utils/_buildHelper.js', 'gulp/utils/buildHelper.js');
    this.copy('gulp/utils/_handleError.js', 'gulp/utils/handleError.js');
    this.copy('gulp/utils/_jsHintErrorReporter.js', 'gulp/utils/jsHintErrorReporter.js');
    
    this.copy('gulp/_config.js', 'gulp/config.js');
    
    this.template('gulp/tasks/_build.js', 'gulp/tasks/build.js');
    this.template('gulp/tasks/_copy.js', 'gulp/tasks/copy.js');
    this.template('gulp/tasks/_serve.js', 'gulp/tasks/serve.js');
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
      name: this._.slugify(this.projectName),
      private: true,
      dependencies: {}
    };

    if (this.includeBootstrap) {
      var bs = 'bootstrap-sass-official';
      bower.dependencies[bs] = '~3.2.0';
    }

    if (this.includeFoundation) {
      bower.dependencies.foundation = 'zurb/bower-foundation#~5.4.5';
    }

    if (this.includejQuery) {
      bower.dependencies.jquery = '~2.1.1';
    }

    this.write('bower.json', JSON.stringify(bower, null, 2));
    this.mkdir('bower_components');
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

  cssLint: function () {
    this.copy('csslintrc', '.csslintrc');
  },

  jade : function () {
    this.template('views/_index.jade', 'app/views/index.jade');
    this.template('views/layouts/_default.jade', 'app/views/layouts/_default.jade');
    this.template('views/modules/_header.jade', 'app/views/modules/_header.jade');
    this.template('views/modules/_footer.jade', 'app/views/modules/_footer.jade');
    this.copy('views/data/_index.json','app/views/data/index.json');
  },

  js : function () {
    this.directory('app');
    this.mkdir('app/scripts');
    this.template('scripts/_main.js', 'app/scripts/main.js');
  },

  app: function () {
    this.directory('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.mkdir('app/icons');
    this.mkdir('app/fonts');
    this.mkdir('app/styles/modules');
    this.mkdir('app/scripts/plugins');
    this.mkdir('app/scripts/modules');
  },
  
  lightingFLy: function() {
    if (this.includeLightingFly) {
      this.directory('lighingfly', 'app/styles/lightingfly');
    }
  },

  install: function () {
    
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install'],
        callback: function () {
          var self = this;
          this.log(chalk.green('All done, hodd luck!'));
        }.bind(this)
      });
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
