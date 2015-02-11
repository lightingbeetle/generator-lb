# Generator LB

> Yeoman generator for creating static website/templates using Sass, Jade, Gulp, Bower used by [Lighting Beetle](http://www.lbstudio.sk).

## Prereqisities

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)
```javascript
(sudo) npm install -g yo
```
* [Bower](http://bower.io/)
```javascript
(sudo) npm install -g bower
```
* [Git](http://git-scm.com/)
* [Sass](http://sass-lang.com/)

## Built-in tools

* Gulp (Task Manager)
* Bower (Web Package manager)
* Sass (Compass/LibSass) (CSS Preprocessor)
* Jade (HTML templating)
* LB Styleguide (UIKit framework - in beta development) (optional)
* Bootstrap (Frontend framework) (Sass version) (optional)
* Foundation (Frontend framework) (optional)
* Modernizr (HTML5/CSS3 features detection) (optional)
* jQuery (feature-rich JavaScript library) (optional)
* LightingFly (SCSS mixins library) (optional)
* Mocha (Unit testing) (optional)

## Built-in features

* CSS autoprefixing
* Webserver with liverelaod
* Jade compilation
* Sass compilation
* CSS/JS concating and minification
* JS linting
* Automatic wiring up Bower components
* Image optimaliztion
* Lean Modernizr builds
* Mocha unit testing (optional)
* Improved file caching
* Deploying via rsync/sftp

## Installation guide

1. Install via npm `(sudo) npm install -g generator-lb`  
2. Create folder for your project and run inside: `yo lb`  
3. Complete installation
4. ?
5. Profit

## Usage

Gulpfile contains some useful tasks:

1. `gulp serve` for development with livereload
2. `gulp build` for building from source to `dist` folder
3. `gulp serve:dist` for build preview
4. `gulp deploy` for deploing on dev server via sftp (config is in .env file) 
5. `gulp deploy:prod` for deploing on prod server via sftp (config is in .env file) 

## Folder structure

```
.
+-- app
    +-- fonts
    +-- icons
    +-- images
    +-- scripts
        +-- modules
        +-- plugins
        +-- main.js
    +-- styles
        +-- lightingfly (light)
        +-- modules
        +-- plugins
        +-- main.scss
    +-- views (optional)
        +-- data
            +-- index.json
            +-- icons.json (light)
        +-- layouts
            +-- _default.jade
            +-- _footer.jade
            +-- _header.jade
        +-- styleguide (light)
            +-- _layout.jade
        +-- index.jade
        +-- styleguide.jade (light)
    +-- .htaccess
    +-- favicon.ico
    +-- robots.txt
+-- bower_components
+-- dist
+-- gulp
    +-- tasks
        +-- browserSync.js
        +-- build.js
        +-- buildSize.js
        +-- clean.js
        +-- copy.js
        +-- extras.js
        +-- fonts.js
        +-- images.js
        +-- jade.js
        +-- jadePrepareData.js
        +-- jshint.js
        +-- modernizr.js
        +-- serve.js
        +-- styles.js
        +-- useref.js
        +-- watch.js
        +-- wiredep.js
    +-- utils
        +-- buildHelper.js
        +-- handleError.js
        +-- jsHintErrorReporter.js
    +-- config.js
+-- node_modules
+-- test (optional)
+-- .editorconfig
+-- .env
+-- .gitattributes
+-- .gitignore
+-- .jshintrc
+-- .yo-rc.json
+-- bower.json
+-- gulpfile.js
+-- package.json
```

## Notes
 * Data for jade templates can by stored as JSON objects inside. ```app/views/data/```
 * Project is properly tested with light and Ruby Sass setup.

## Trubleshooting
 * Gulp wiredep is sometimes accomplished on second time

## Issues
 * gulp-ruby-sass do not use notification system
 * Modernizr task is really awkward and sometimes segfaulting
 * gulp-rev is currently disabled and not working (advanced cacheing)
 
## Contributors
 * Adam Močkoř (mockor@lbstudio.sk)

--- 
[![Lighting Beetle](http://www.lbstudio.sk/static/imgs/lb-logo-orange.png "Lighting Beetle")](http://www.lbstudio.sk)

