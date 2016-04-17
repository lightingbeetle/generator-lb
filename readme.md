# Generator LB

[![Build Status](https://travis-ci.org/lightingbeetle/generator-lb.svg?branch=master)](https://travis-ci.org/lightingbeetle/generator-lb)

> Yeoman generator for creating static website/templates using Sass, Jade, Gulp, Bower used by [Lighting Beetle](http://www.lbstudio.sk).

## Prereqisities

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)
```javascript
(sudo) npm install -g yo
```
* [Gulp](http://gulpjs.com/)
```javascript
(sudo) npm install -g gulp
```
* [Bower](http://bower.io/)
```javascript
(sudo) npm install -g bower
```

## Built-in tools

* Gulp (Task Manager)
* Bower (Web Package manager)
* Sass (LibSass/ruby) (CSS Preprocessor)
* Jade (HTML templating)
* ES6 compilation to ES5 using Babel
* Bootstrap (Frontend framework) (Sass version) (optional)
* Foundation (Frontend framework) (optional)
* Modernizr (HTML5/CSS3 features detection) (optional)
* jQuery 1.x/2.x(feature-rich JavaScript library) (optional)
* LightingFly (SCSS mixins library) (optional)
* Mocha (Unit testing) (optional)

## Built-in features

* CSS autoprefixing (autoprefixer)
* Webserver with liverelaod (browserSync)
* Jade compilation
* Sass compilation
* YAML/JSON data sources for templates
* CSS/JS concating and minification (cssnano)
* JS linting (eslint with airbnb config)
* ES6 compilation (babel)
* Automatic wiring up Bower components (wiredep)
* Image optimaliztion (imagemin)
* Lean Modernizr builds
* Mocha unit testing (optional)
* Improved file caching
* Deploying via rsync/sftp
* Multi-language templates support (optional)
* Advanced routing in development

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
4. `gulp deploy` for deploying on dev server via sftp (config is in .env file) 
5. `gulp deploy:prod` for deploying on prod server via sftp (config is in .env file)  
6. `gulp help` for information about other tasks

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
        +-- modules
        +-- plugins
        +-- main.scss
    +-- views
        +-- data
            +-- index.[json/yaml]
        +-- helpers
        +-- layouts
            +-- _default.jade
        +-- modules
            +-- _footer.jade
            +-- _header.jade
        +-- index.jade
    +-- .htaccess
    +-- favicon.ico
    +-- robots.txt
+-- bower_components
+-- dist
+-- gulp
    +-- tasks
        +-- browserSync.js
        +-- build.js
        +-- clean.js
        +-- copy.js
        +-- default.js
        +-- deploy.js
        +-- images.js
        +-- modernizr.js (optional)
        +-- scripts.js
        +-- serve.js
        +-- styles.js
        +-- templates.js
        +-- watch.js
        +-- wiredep.js
    +-- utils
        +-- buildHelper.js
        +-- handleError.js
    +-- config.js
+-- node_modules
+-- .editorconfig
+-- .env
+-- .gitattributes
+-- .gitignore
+-- .eslintrc
+-- .yo-rc.json
+-- bower.json
+-- gulpfile.js
+-- package.json
```

## Notes
 * Gulp tasks can be configured inside `config.js` file in `gulp` folder.
 * Data for jade templates can by stored as YAML/JSON objects inside. ```app/views/data/```
 * Build can be forced with ```gulp build --force```
 
## Contributors
 * Adam Močkoř (mockor@lbstudio.sk)

--- 
[![Lighting Beetle](http://www.lbstudio.sk/static/imgs/lb-logo-orange.png "Lighting Beetle")](http://www.lbstudio.sk)

