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
        this.argument('partName', {
    		type: String,
    		required: false,
    	});
        this.partName = this.partName;
    },
	prompting: function() {
		var done = this.async();
		var prompts = [
			{
                name: 'route',
                type: 'input',
                message: 'Enter your route url (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
            }
		];

        /**
         * [If the parn name is not defined by the requesting]
         */
        if (!this.partName) {
            helpers.promptsObjExtand(prompts, 'part');
        }

		this.prompt(prompts, function (props) {
            this.route = url.resolve('', props.route);
            if (props.name) {
                this.partName = props.name;
            }
            this.partName = _.trim(this.partName.toLowerCase());
	        done();
	    }.bind(this));
	},
	configuring: function () {

	},
	writing: {
		htmlFile: function(){
			this.fs.copyTpl(
				this.templatePath('part.html'),
				this.destinationPath('app/'+this.config.get('partsDir')+this.partName+'/'+this.partName+'.html'), {
                    ctrlname: _.camelize(this.partName)
				}
			);
		},
        jsFile: function(){
			this.fs.copyTpl(
				this.templatePath('part.js'),
				this.destinationPath('app/'+this.config.get('partsDir')+this.partName+'/'+this.partName+'.js'), {
				    appname: _.camelize(this.appname),
                    ctrlname: _.camelize(_.classify(this.partName)) + 'Ctrl'
				}
			);
		},
        styleFile: function(){
			this.fs.copyTpl(
				this.templatePath('part.less'),
				this.destinationPath('app/'+this.config.get('partsDir')+this.partName+'/'+this.partName+'.less')
			);
		},
        filesUpdate: function(){
            var appjsConfig = {
                file: 'app.js',
                path: 'app/',
                needle: 'otherwise',
                snippet: [
                    "$stateProvider.state('"+this.partName+"', {",
                    "    url: '"+this.route+"',",
                    "    templateUrl: 'parts/"+this.partName+'/'+ this.partName + ".html',",
                    "    controller: '" + _.camelize(_.classify(this.partName)) + "Ctrl',",
                    "    controllerAs: 'vm' ",
                    "});"
                ]
            };

        	helpers.rewriteFile.call(this, appjsConfig);

            var appSassConfig = {
                file: 'app.scss',
                path: 'app/',
                needle: 'Add Component SASS Above',
                snippet: [
                    '@import "parts/'+this.partName+'/'+this.partName+'.scss";'
                ]
            };
        	helpers.rewriteFile.call(this, appSassConfig);
        }
	},

	install: function() {

	}
});
