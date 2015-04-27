module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'assets/js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                       
          'dist/css/main.css': 'assets/css/main.scss',      
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/vendor/_bower.js', 'assets/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'assets/vendor/_bower.js',
        cssDest: 'assets/vendor/_bower.css',
        exclude: [
          'jquery',
          'modernizr'
        ],
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
          'jquery-mousewheel': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    watch: {
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      styles: {
        files: ['assets/css/**/*.scss', 'assets/css/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint']);

};