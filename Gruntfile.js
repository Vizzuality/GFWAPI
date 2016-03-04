'use strict';
module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      doc: ['doc']
    },
    jshint: {
      js: {
        src: [
          'src/**/*.js'
        ],
        options: {
          jshintrc: true
        },
        globals: {}
      },
      jsTest: {
        src: [
          'test/**/*.js'
        ],
        options: {
          jshintrc: true
        },
        globals: {}
      }
    },
    express: {
      dev: {
        options: {
          script: 'index.js',
          'node_env': 'dev',
          port: 3000,
          output: 'Server started'
        }
      }
    },

    mochaTest: {
      unit: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)

        },
        src: ['test/unit/**/*.js']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      jssrc: {
        files: [
          'src/**/*.js',
        ],
        tasks: ['jshint:js', 'mochaTest:unit', 'express:dev'],
        options: {
          spawn: false
        }
      },
      unitTest: {
        files: [
          'test/unit/**/*.js',
        ],
        tasks: ['jshint:jsTest', 'mochaTest:unit'],
        options: {
          spawn: false
        }
      },

    }
  });


  grunt.registerTask('doc', ['clean:doc']);

  grunt.registerTask('unitTest', ['mochaTest:unit']);

  grunt.registerTask('serve', ['express:dev', 'watch']);

  grunt.registerTask('default', 'serve');

};
