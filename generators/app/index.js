'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('underscore.string');


module.exports = yeoman.Base.extend({
	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the groundbreaking ' + chalk.red('generator-great-angular') + ' generator!'
		));

		var prompts = [
			{
				name: 'appname',
				type: 'input',
        		message: 'Your project name',
        		default: path.basename(process.cwd())
			},
			{
		        name: 'router',
		        type: 'list',
		        message: 'Which router would you like to use?',
		        default: 0,
		        choices: ['Standard Angular Router','Angular UI Router']
	    	},
			{
		        name: 'requestsService',
		        type: 'list',
		        message: 'Which requests service would you like to use?',
		        default: 0,
		        choices: ['Restangular','Angular Resource']
	    	}

		];


		this.prompt(prompts, function (props) {
			this.appname = props.appname;

			// Router
			if (props.router === 'Angular UI Router') {
	            this.uirouter = true;
	            this.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
	            this.routerModuleName = 'ui.router';
	            this.routerViewDirective = 'ui-view';
	        }
			else {
	            this.uirouter = false;
	            this.routerJs = 'bower_components/angular-route/angular-route.js';
	            this.routerModuleName = 'ngRoute';
	            this.routerViewDirective = 'ng-view';
	        }

			// Request client
			if (props.requestsService === 'Restangular') {
	            this.restangular = true;
				this.requestsServiceJs = 'bower_components/restangular/dist/restangular.js';
	            this.requestsServiceModuleName = 'restangular';

	        }
			else {
	            this.restangular = false;
				this.requestsServiceJs = 'bower_components/angular-resource/angular-resource.js';
	            this.requestsServiceModuleName = 'ngResource';
	        }

			//
	        done();
	    }.bind(this));
	},
	configuring: function () {
		this.config.set('uirouter', this.uirouter);
		this.config.set('routerName', this.routerModuleName);
		this.config.set('requestsService', this.requestsService);
		this.config.set('partsDir','parts/');
        this.config.set('serviceDir','services/');
        this.config.set('directiveDir','directives/');
        this.config.set('filterDir','filters/');
		this.config.set('modalDir','modals/');
		this.config.save();
	},
	writing: {
		index: function(){
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('app/index.html'), {
					appname: _.camelize(this.appname),
					routerJs: this.routerJs,
					routerViewDirective: this.routerViewDirective,
					requestsServiceJs: this.requestsServiceJs
				}
			);
		},
		app: function(){
			this.fs.copyTpl(
				this.templatePath('app.js'),
				this.destinationPath('app/app.js'), {
					appname: _.camelize(this.appname),
					routerModuleName: this.routerModuleName,
					uirouter: this.uirouter,
					requestsSvcName: this.requestsServiceModuleName
				}
			);
		},
		appless: function(){
			this.fs.copyTpl(
				this.templatePath('app.less'),
				this.destinationPath('app/app.less')
			);
		},
		bower: function(){
			this.fs.copyTpl(
				this.templatePath('bower.json'),
				this.destinationPath('bower.json'), {
					appname: _.camelize(this.appname),
					router: this.uirouter ? '"angular-ui-router":"0.2.18"': '"angular-route":"~1.5"',
					requestsService: this.restangular ? '"restangular": "~1.5"' : '"angular-resource": "~1.5"',
				}
			);
		},
		packagejs: function(){
			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('package.json'), {
					appname: _.camelize(this.appname)
				}
			);
		},
		gulpfile: function(){
			this.fs.copyTpl(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'), {
					appname: _.camelize(this.appname)
				}
			);
		}

	},

	install: function() {
		this.installDependencies({ skipInstall: this.options['skip-install'] });
	}
});
