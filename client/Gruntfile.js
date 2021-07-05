module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js',
                    'node_modules/textangular/dist/textAngular-rangy.min.js',
                    'node_modules/textangular/dist/textAngular-sanitize.js',
                    'node_modules/textangular/dist/textAngular.js',
                    'app/app.js',
                    'app/factories.js',
                    'app/controllers.js'
                ],
                dest: 'app/scripts.js'
            },
            css : {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    'node_modules/textangular/dist/textAngular.css',
                    'public/css/admin/admin.css'
                ],
                dest: 'public/css/admin/bundle.css'
            }
        },
        watch : {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat']
            },
            css : {
                files: ['public/css/admin/**/*.css'],
                tasks: ['concat']
            }
        }

    });

    grunt.loadNpmTasks()
}