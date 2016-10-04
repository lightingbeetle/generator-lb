'use strict';

var requireDir = require('require-dir');

// handle enviromental variables in .env file
require('dotenv').config({silent: true});

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });