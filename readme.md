# Generator LB

[![Build Status](https://travis-ci.org/lightingbeetle/generator-lb.svg?branch=master)](https://travis-ci.org/lightingbeetle/generator-lb)

> Yeoman generator for creating static website/templates using Sass, Rollup, Pug, and Gulp, used by [Lighting Beetle](http://www.lbstudio.sk).

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

## Built-in tools

* Gulp (Task Manager)
* Sass (LibSass) (CSS Preprocessor)
* Pug (HTML templating)
* ES2016 compilation to ES5 using Babel
* ES2015 modules bundling with Rollup.js
* Bootstrap (Frontend framework) (Sass version) (optional)
* Foundation (Frontend framework) (optional)
* Modernizr (HTML5/CSS3 features detection) (optional)
* jQuery 2.x/3.x(feature-rich JavaScript library) (optional)
* LightingFly (SCSS mixins library) (optional)

## Built-in features

* CSS autoprefixing (autoprefixer)
* Webserver with liverelaod (browserSync)
* Pug compilation
* Sass compilation
* YAML/JSON data sources for templates
* CSS/JS concating and minification (cssnano)
* JS linting (eslint with airbnb config)
* ES2016 transpiling (babel)
* ES2015 modules bundling (rollup)
* Image optimaliztion (imagemin)
* Lean Modernizr builds
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
        +-- external
            +-- jquery.js
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
        +-- rev.js
        +-- scripts.js
        +-- serve.js
        +-- styles.js
        +-- templates.js
        +-- watch.js
    +-- utils
        +-- buildHelper.js
        +-- handleError.js
    +-- config.js
+-- node_modules
+-- .babelrc
+-- .editorconfig
+-- .env
+-- .gitattributes
+-- .gitignore
+-- .eslintrc
+-- .yo-rc.json
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

