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
            }
        },
        express: {
            dev: {
                options: {
                    script: 'index.js',
                    'node_env': 'dev',
                    harmony: true,
                    port: 3000,
                    output: 'Server started'
                }
            }
        },
        watch: {
            jssrc: {
                files: [
                    'src/**/*.js',
                ],
                tasks: ['jshint:js', 'express:dev']
            },

        }
    });


    grunt.registerTask('doc', ['clean:doc']);

    grunt.registerTask('serve', ['express:dev', 'watch']);

    grunt.registerTask('default', 'serve');

};
