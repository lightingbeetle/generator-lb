'use strict';

var requireDir = require('require-dir');

// handle enviromental variables in .env file
var dotenv = require('dotenv');
dotenv.load();

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });