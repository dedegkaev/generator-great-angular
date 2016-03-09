'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var chalk = require('chalk');
var path = require('path');
var url = require('url');
var _ = require('underscore.string');
var ngParseModule = require('ng-parse-module');
var fs = require('fs');


/**
 * [MyError: Custom errors]
 * @param {[String]} message        [description]
 * @param {[String]} customProperty [description]
 */
function MyError(message, customProperty) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.customProperty = customProperty;
}

/**
 * @method promptsObjExtand
 * @param  {[type]}         prompts   [description]
 * @param  {[type]}         type      [description]
 * @return {[type]}                   [description]
 */
function promptsObjExtand(prompts, type){
    prompts.splice(0,0,{
        name:'name',
        type:'input',
        message: 'Enter a name for the ' + type + ':',
        validate: function(input){
            if (input.length) {
                return true;
            }
            else {
                return false;
            }

        }
    });
}

/**
 * [codeReform description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function codeReform(config) {

	var re = new RegExp(config.snippet.map(function(line) {
		return '\s*' + escapeRegExp(line);
	}).join('\n'));

	if (re.test(config.editableFile)) {
		return config.editableFile;
	}

	var lines = config.editableFile.split('\n');

	var needleLineIndex = 0;
	lines.forEach(function(line, i) {
		if (line.indexOf(config.needle) + 1) {
			needleLineIndex = i;
		}
	});

	var spaces = 0;
	while (lines[needleLineIndex].charAt(spaces) === ' ') {
		spaces += 1;
	}

	var tabs = 0;
	while (lines[needleLineIndex].charAt(tabs) === '\t') {
		tabs += 1;
	}
    var spacesString = '';

    if (spaces) {
    	while ((spaces -= 1) >= 0) {
    		spacesString += ' ';
    	}
    }
    else if (tabs) {
    	while ((tabs -= 1) >= 0) {
    		spacesString += '\t';
    	}
    }

	lines.splice(needleLineIndex, 0, config.snippet.map(function(line) {
		return spacesString + line;
	}).join('\n'));

	return lines.join('\n');
}

/**
 * [rewriteFile description]
 * @param  {[Array]} args [template]
 */
function rewriteFile(config) {
    var _this = this;
    config.path = config.path || process.cwd();
    var file = path.join(config.path, config.file);

    fs.readFile(file, 'utf8', function(err, contents) {
        config.editableFile = contents;
        var codeSnippet = codeReform(config);
        fs.writeFileSync(file, codeSnippet);
        _this.log.writeln(chalk.yellow('updated   ')+file);
    });
}

function escapeRegExp (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

module.exports = {
  codeReform: codeReform,
  rewriteFile: rewriteFile,
  MyError: MyError,
  promptsObjExtand: promptsObjExtand
};
