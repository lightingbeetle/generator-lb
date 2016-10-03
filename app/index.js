'use strict';

const Base = require('yeoman-generator').Base;
const chalk = require('chalk');
const slugify = require('underscore.string').slugify;
const Insight = require('insight');
const mkdir = require('mkdirp');

const ifFile = require('gulp-if');
const frep = require('gulp-frep');

function hasFeature(feat, features) {
  return features && features.indexOf(feat) !== -1;
}

const frepPatterns = [{
    // Remove empty first line
    pattern: /^[\s\t]*[\n\r]/,
    replacement: ''
  }, {
    // Normalize and condense newlines
    pattern: /^\s*$[\n\r]{2,}/gm,
    replacement: '\n'
  }
];

module.exports = class Generator extends Base {
  
  constructor() {
    super(arguments[0], arguments[1]);
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
    
    // cleanup .pug files
    this.registerTransformStream(ifFile('*.pug',
      frep(frepPatterns)
    ));
    
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(chalk.yellow(require('yosay')('Welcome to Lighting Beetle generator. Hodd luck!')));
    }
  }
  
  get initializing() {
    return function() {
      this.pkg = require('../package.json');
      this.version = this.pkg.version;
      this.config.set('version', this.version);
      
      this.insight = new Insight({
        // Google Analytics tracking code
        trackingCode: 'UA-27851629-19',
        pkg: this.pkg,
        version: this.version
      });
    };
  }

  get prompting() {
    return {
      askForAnalytics: function() {
        if (this.insight.optOut === undefined) {
          this.insight.askPermission('May generator-lb anonymously report usage statistics to improve the tool over time?', () => {});
        }
      },
      askForProjectName: function() {
        const prompts = [{
          type: 'input',
          name: 'name',
          message: 'What is name of your project?',
          default : this.appname // default is current folder
        }];
        
        return this.prompt(prompts).then((props) => {
          this.insight.track('install', 'start');

          this.projectName = props.name;
          this.projectNameSlug = slugify(props.name);
          
          this.config.set('name', props.name);
        });
      },
      askForFeatures: function(){
    
        const prompts = [{
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
            name: 'Foundation 6 (jQuery2, Modernizr)',
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
        
        return this.prompt(prompts).then((props) => {
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
            if (this.includejQuery1 !== true || this.includejQuery2 !== true)  {
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
          
          this.insight.track('modernizr', this.includeModernizr);
          this.insight.track('lightingFly', this.includeLightingFly);
          this.insight.track('jQuery1', this.includejQuery1);
          this.insight.track('jQuery2', this.includejQuery2);
          
          if (props.feFramework) {
            this.insight.track('bootstrap', this.includeBootstrap);
            this.insight.track('foundation', this.includeFoundation);
          }
        });
      },
      askForSassCompilator: function() {
        const prompts = [{
          type: 'list',
          name: 'sassCompilator',
          message: 'What SASS compilator do you want to use?',
          choices: [{
            name: 'LibSass - Node.js',
            value: 'libSass',
          }, {
            name: 'Compass - Ruby',
            value: 'rubySass',
          }],
          default: 0
        }];
        
        return this.prompt(prompts).then((props) => {   
          this.includeRubySass = hasFeature('rubySass', props.sassCompilator);
          this.includeLibSass = hasFeature('libSass', props.sassCompilator);
          
          this.insight.track('sass', props.sassCompilator);
          
          this.config.set('sassCompilator', props.sassCompilator);
        });
      },
      askForMultiLanguage: function() {        
        const prompts = [{
          type: 'confirm',
          name: 'includeMultiLanguage',
          message: 'Do you want support for multi-language templates?',
          default: false
        }];
        
        return this.prompt(prompts).then((props) => {
          //testing framework
          this.includeMultiLanguage = props.includeMultiLanguage;
          
          this.insight.track('multiLanguage', props.includeMultiLanguage);
          
          this.config.set('multiLanguage', props.includeMultiLanguage);
        });
      },
      askForDataFormat: function() {
        const prompts = [{
          type: 'list',
          name: 'dataFormat',
          message: 'What data source format do you prefer?',
          choices: [{
            name: 'YAML',
            value: 'yaml',
          }, {
            name: 'JSON',
            value: 'json',
          }],
          default: 0
        }];
        
        return this.prompt(prompts).then((props) => {
          
          this.includeDataYAML = hasFeature('yaml', props.dataFormat);
          this.includeDataJSON = hasFeature('json', props.dataFormat);
          
          this.insight.track('dataFormat', props.dataFormat);
          
          this.config.set('dataFormat', props.dataFormat);
        });
      },
    };
  }
  
  get configuring() {
    return function() {
      this.config.save();
    };
  }
  
  get default() {
    return {};
  }
  
  get writing() {
    return {
      gulp: function () {
        this.copy('_gulpfile.js','gulpfile.js');
        
        this.copy('gulp/tasks/_browserSync.js', 'gulp/tasks/browserSync.js');
        this.copy('gulp/tasks/_clean.js', 'gulp/tasks/clean.js');
        this.copy('gulp/tasks/_default.js', 'gulp/tasks/default.js');
        this.copy('gulp/tasks/_deploy.js', 'gulp/tasks/deploy.js');
        this.copy('gulp/tasks/_images.js', 'gulp/tasks/images.js');
        this.copy('gulp/tasks/_rev.js', 'gulp/tasks/rev.js');
        this.copy('gulp/tasks/_templates.js', 'gulp/tasks/templates.js');
        this.copy('gulp/tasks/_watch.js', 'gulp/tasks/watch.js');
        
        this.copy('gulp/utils/_buildHelper.js', 'gulp/utils/buildHelper.js');
        this.copy('gulp/utils/_handleError.js', 'gulp/utils/handleError.js');
        
        this.template('gulp/_config.js', 'gulp/config.js');
        
        this.template('gulp/tasks/_build.js', 'gulp/tasks/build.js');
        this.template('gulp/tasks/_copy.js', 'gulp/tasks/copy.js');
        this.template('gulp/tasks/_serve.js', 'gulp/tasks/serve.js');
        this.template('gulp/tasks/_scripts.js', 'gulp/tasks/scripts.js');
        this.template('gulp/tasks/_styles.js', 'gulp/tasks/styles.js');
        
        if (this.includeModernizr) { 
          this.copy('gulp/tasks/_modernizr.js', 'gulp/tasks/modernizr.js');
        }
      },
      
      dependencies: function () {
        this.dependencies = {};
        
        if (this.includeBootstrap) {
          this.dependencies['bootstrap-sass'] = '~3.3.6';
        }
        
        if (this.includeFoundation) {
          this.dependencies['foundation-sites'] = '~6.2.1';
        }
        
        if (this.includejQuery1) {
          this.dependencies.jquery = '~1.11.3';
        }
        
        if (this.includejQuery2) {
          this.dependencies.jquery = '~2.1.4';
        }
        
        if (this.includeLightingFly) {
          this.dependencies.lightingfly = '~0.2.1';
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
      
      env: function(){
        this.copy('env', '.env');
      },

      eslint: function () {
        this.copy('eslintrc', '.eslintrc');
        this.copy('eslintignore', '.eslintignore');
      },
      
      babel: function () {
        this.copy('babelrc', '.babelrc');
      },

      editorConfig: function () {
        this.copy('editorconfig', '.editorconfig');
      },

      mainStylesheet: function () {
        this.template('styles/_main.scss', 'app/styles/main.scss');
      },

      pug : function () {
        this.template('views/_index.pug', 'app/views/index.pug');
        this.template('views/layouts/_default.pug', 'app/views/layouts/_default.pug');
        this.template('views/modules/_header.pug', 'app/views/modules/_header.pug');
        this.template('views/modules/_footer.pug', 'app/views/modules/_footer.pug');
        mkdir('app/views/helpers');
        mkdir('app/views/mixins');
        if (this.includeMultiLanguage) {
          this.copy('views/helpers/_language.pug','app/views/helpers/_language.pug');
        }
        
        // data template
        if (this.includeDataYAML) {
          this.template('views/data/_index.yaml','app/views/data/index.yaml');
        } else {
          this.template('views/data/_index.json','app/views/data/index.json');
        }
      },

      js : function () {
        this.directory('app');
        this.template('scripts/_main.js', 'app/scripts/main.js');
        this.template('scripts/modules/_utils.js', 'app/scripts/modules/utils.js');
        
        if (this.includejQuery1 || this.includejQuery2) {
          this.copy('scripts/external/jquery.js', 'app/scripts/external/jquery.js');
        }
        
        mkdir('app/scripts/plugins');
      },

      app: function () {
        this.directory('app');
        mkdir('app/scripts');
        mkdir('app/styles');
        mkdir('app/images');
        mkdir('app/icons');
        mkdir('app/fonts');
        mkdir('app/styles/modules');
      }
    };
  }

  get install() {
    return function() {
      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install'],
          bower: false,
          callback: () => {
            this.log(chalk.yellow(`
                                     __                   ____ 
   ____ ____  ____  ___  _________ _/ /_____  _____      / / /_
  / __ \`/ _ \\/ __ \\/ _ \\/ ___/ __ \`/ __/ __ \\/ ___/_____/ / __ \\
 / /_/ /  __/ / / /  __/ /  / /_/ / /_/ /_/ / /  /_____/ / /_/ /
 \\__, /\\___/_/ /_/\\___/_/   \\__,_/\\__/\\____/_/        /_/_.___/
/____/
            `));
            this.log(chalk.green('All done, hodd luck!'));
            this.log(chalk.green(''));
            this.log(chalk.cyan('Serve project with: $ gulp serve'));
            this.log(chalk.cyan('Build project with: $ gulp build'));
            this.log(chalk.cyan('Help:               $ gulp help'));
            this.insight.track('install', 'done');
          }
        });
      } else {
        this.insight.track('install', 'skip-install');
      }
    };
  }
  
  get end() {
    return {};
  }
}
