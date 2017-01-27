(function() {

  'use strict';

  const Generator = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const fs = require('fs');
  const path = require('path');

  module.exports = Generator.extend({
    prompting: function() {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('Node+Express') + ' generator on the market!'
      ));
      const prompts = [
        {
          name: 'authorName',
          message: 'Author name?',
          required: true,
          default: 'Michael Herman'
        },
        {
          name: 'authorEmail',
          message: 'Author email?',
          required: true,
          default: 'michael@mherman.org'
        },
        {
          name: 'projectName',
          message: 'Project name?',
          required: true,
          default: 'generator-herman-express'
        },
        {
          name: 'databaseName',
          message: 'Database name?',
          default: 'generator_herman_express'
        }
      ];
      return this.prompt(prompts).then(function(props) {
        this.props = props;
      }.bind(this));
    },
    writingFiles: function() {
      this.fs.copyTpl(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml'),
        {
          databaseName: this.props.databaseName
        }
      );
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('.env-sample'),
        this.destinationPath('.env')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('.jscsrc'),
        this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          year: (new Date()).getFullYear(),
          name: this.props.name,
          email: this.props.email
        }
      );
    },
    writingFolders: function() {
      this.fs.copy(
        this.templatePath('src/'),
        this.destinationPath('src/')
      );
      this.fs.copy(
        this.templatePath('test/'),
        this.destinationPath('test/')
      );
    },
    createDatabase: function() {
      this.fs.copyTpl(
        this.templatePath('knexfile.js'),
        this.destinationPath('knexfile.js'),
        {
          database: this.props.databaseName
        }
      );
    }
  });

}());
