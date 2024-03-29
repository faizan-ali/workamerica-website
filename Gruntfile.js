/*global module:false*/
module.exports = function (grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);
    // shows time taken
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        /**
         * Get package metadata and AWS credentials
         */
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('aws.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        /**
         * Project task configuration
         */

        /*
         *  Uploading to AWS S3. Pulls credentials from aws.json in root directory to upload website files to
         *  workamerica.co S3 bucket
         *  TODO Replace master credentials with restricted account credentials
         * */

        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                region: 'us-west-2',
                // A high number seems to break the package
                // TODO Figure out the upper limit
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            production: {
                options: {
                    differential: true,
                    bucket: 'workamerica.co',
                },
                // Grabs all HTML and minified CSS & JS files and deploys to root for HTML, css for CSS,
                // js for JS, and img for images
                files: [
                    {expand: true, cwd: 'css', src: '*.min.css', dest: 'css'},
                    {expand: true, cwd: 'img', src: '**', dest: 'img'},
                    {expand: true, cwd: '', src: '*.html', dest: '/'},
                    {expand: true, cwd: 'js', src: '*.min.js', dest: 'js'},
                    {expand: true, cwd: 'fonts', src: '**', dest: 'fonts'}
                ]
            },
            stage: {
              options: {
                  differential: true,
                  bucket: 'website-stage.workamerica.co',
              },
              // Grabs all HTML and minified CSS & JS files and deploys to root for HTML, css for CSS,
              // js for JS, and img for images
              files: [
                  {expand: true, cwd: 'css', src: '*.min.css', dest: 'css'},
                  {expand: true, cwd: 'img', src: '**', dest: 'img'},
                  {expand: true, cwd: '', src: '*.html', dest: '/'},
                  {expand: true, cwd: 'js', src: '*.min.js', dest: 'js'},
                  {expand: true, cwd: 'fonts', src: '**', dest: 'fonts'}
              ]
            }
        },

        /*
         * Compiling Slim. Takes all .slim files in slim and converts to .html files with the same name in root
         * */
        slim: {
            dev: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'slim',
                    src: '**/*.slim',
                    dest: '',
                    ext: '.html'
                }]
            },

            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'slim',
                    src: '**/*.slim',
                    dest: '',
                    ext: '.html'
                }]
            }
        },

        /*
         * Compiling SASS. Takes all .scss files in sass and coverts to .css files with the same name in css
         * */
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: '**/*.scss',
                    dest: 'css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: '**/*.scss',
                    dest: 'css',
                    ext: '.css'
                }]
            }

        },

        /*
         * Linting JavaScript. Attempts to programatically detect and report errors and potential problems in code.
         * */
        jshint: {
            files: ['js/*.js'],
            // Ignores minified files
            options: {
                ignores: ['js/*.min.js']
            }
        },

        /*
         * Linting CSS. Attempts to programatically detect and report errors and potential problems in code.
         * */
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['css/*.css', '!css/*.min.css', '!*normalize.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['css/*.css', '!css/*.min.css']
            }
        },

        /*
         * Linting SASS. Attempts to programatically detect and report errors and potential problems in code.
         * */
        scsslint: {
            allFiles: ['sass/{,*/}*.scss'],
            options: {
                force: true,
                config: '.scss-lint.yml',
                colorizeOutput: true,
                exclude: 'sass/utility/*'
            }
        },

        /*
         * Linting HTML. Attempts to programatically detect and report errors and potential problems in code.
         * */
        htmllint: {
            all: {
                options: {
                    force: true
                },
                src: ['*.html']
            }
        },


        /*
         * Minifying Javascript. Takes all .js files (ignoring .min.js files) in js and minifies them, storing in the same directory
         * and overwriting existing minified files
         * */
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    // Ignoring .min.js files
                    src: ['*.js', '!*.min.js'],
                    dest: 'js',
                    ext: '.min.js'
                }]
            }
        },

        /*
         * Minifying CSS. Takes all .css files (ignoring .min.css files) in css and minifies them, storing in the same directory
         * */
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },

        /*
         * Postprocessing CSS. Applies several post-processors to CSS using PostCSS
         * So far: Autoprefixer
         * */
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 8', 'Firefox ESR', '> 1% in US']})
                ]
            },
            dist: {
                src: ['css/*.css', '!css/*.min.css']
            }
        },

        /*
        * Cleaning working directory. Cleans between choices of all, HTML, or CSS(minified/normal/all),
        * Javascript (minified)
        * */
        clean: {
            all: {
                src: ['*.html', 'slim/{,*/}*.html', 'css/*.css*', 'js/*.min.js']
            },
            html: {
                src: '*.html'
            },
            css: {
                src: 'css/*.css'
            },
            mincss:{
                src: 'css/*.min.css'
            },
            normalcss: {
                src: ['css/*.css', '!css/*.min.css']
            },
            js: {
                src: ['js/*.min.js']
            }
        },

        concat: {
            dist: {
                files: {
                    'index.html': ['header.html','navbar.html', 'home.html', 'footer.html','navbar-mobile.html'],
                    'about.html': ['header.html','navbar.html', 'about-inner.html', 'footer.html','navbar-mobile.html'],
                    'employers.html': ['header.html','navbar.html', 'employers-inner.html', 'footer.html','navbar-mobile.html'],
                    'partners.html': ['header.html','navbar.html', 'partners-inner.html', 'footer.html','navbar-mobile.html'],
                    'join-now.html': ['header.html','navbar.html', 'join-inner.html', 'footer.html','navbar-mobile.html'],
                    'login.html': ['header.html','navbar.html', 'login-inner.html', 'footer.html','navbar-mobile.html'],
                    'thank-you.html': ['header.html','navbar.html', 'thanks-inner.html', 'footer.html','navbar-mobile.html'],
                    'forgot-password.html': ['header.html','navbar.html', 'forgot-password-inner.html', 'footer.html','navbar-mobile.html'],
                    'terms-and-conditions.html': ['header.html','navbar.html', 'terms-and-conditions-inner.html', 'footer.html','navbar-mobile.html'],
                    'privacy-policy.html': ['header.html','navbar.html', 'privacy-policy-inner.html', 'footer.html','navbar-mobile.html']
                }
            }
        },

        /*
         * Real time SASS->CSS & SLIM->HTML
         * */
        watch: {
            jsMin: {
              files: 'js/{,*/}*.js',
              tasks: ['uglify']
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass:dev', 'cssmin']
            },

            slimConcat: {
                files: 'slim/**/*.slim',
                tasks: ['newer:slim:dev', 'newer:concat:dist']
            }
        }
    });

// Default task.
    grunt.registerTask('dev', ['clean:all', 'slim:dev', 'sass:dev', 'postcss', 'concat', 'jshint', 'uglify', 'cssmin']);
    grunt.registerTask('stage', ['slim:dev','sass:dist', 'postcss', 'concat', 'htmllint', 'jshint', 'scsslint', 'uglify', 'cssmin', 'aws_s3:stage']);
    grunt.registerTask('dist', ['slim:dev','sass:dist', 'postcss', 'concat', 'htmllint', 'jshint', 'scsslint', 'uglify', 'cssmin', 'aws_s3:production']);

};
