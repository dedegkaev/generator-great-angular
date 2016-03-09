'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var helpers = require('../helpers.js');
var chalk = require('chalk');
var path = require('path');
var url = require('url');
var _ = require('underscore.string');
var ngParseModule = require('ng-parse-module');


module.exports = yeoman.Base.extend({
    initializing: function(){
        this.argument('moduleName', {
    		type: String,
    		required: false,
    	});
        this.moduleName = this.moduleName;
    },
	prompting: function() {
		var done = this.async();

        var prompts = [];

        /**
         * [If the module name is not defined by the requesting]
         */
        if (!this.moduleName) {
            helpers.promptsObjExtand(prompts, 'module');
        }

		this.prompt(prompts, function (props) {
            if (props.name) {
                this.moduleName = props.name;
            }
            this.moduleName = _.trim(this.moduleName.toLowerCase());
	        done();
	    }.bind(this));
	},
	configuring: function () {

	},
	writing: {
        jsFile: function(){
			this.fs.copyTpl(
				this.templatePath('module.js'),
				this.destinationPath('app/'+this.moduleName+'/'+this.moduleName+'.js'), {
				    appname: _.camelize(this.moduleName),
                    uirouter: this.config.get('uirouter'),
                    routerModuleName: this.config.get('routerName')
				}
			);
		},
        styleFile: function(){
			this.fs.copyTpl(
				this.templatePath('module.less'),
				this.destinationPath('app/'+this.moduleName+'/'+this.moduleName+'.less')
			);
		},
        filesUpdate: function(){
            var applessConfig = {
                file: 'app.less',
                path: 'app/',
                needle: 'Add Component LESS Above',
                snippet: [
                    '@import "app/'+this.moduleName+'/'+this.moduleName+'.less";'
                ]
            };
        	helpers.rewriteFile.call(this, applessConfig);
        }
	},

	install: function() {

	}
});
