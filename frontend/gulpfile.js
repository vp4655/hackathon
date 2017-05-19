/**
 * Gulp Configuration
 * @desc Configuration of gulps tasks and parameters
 * @namespace GulpConfig
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    config = require('./gulp.config.js')(),
    prod = (argv.prod !== undefined);

// REGULAR TASKS
/**
 * @name AngularConcatenation
 * @desc Concatenates angular external modules and main scripts into one file
 * @memberOf GulpConfig
 */
gulp.task('angular', function(){
    gulp.src(config.folders.js.angularModules)
        .pipe(plumber())
        .pipe(concat('angular-modules.min.js'))
        .pipe(gulp.dest(config.folders.production.js))
        .pipe(browserSync.stream())
});

/**
 * @name AngularScriptsMinification
 * @desc Minifies and concatenates projects angular scripts
 * @memberOf GulpConfig
 */
gulp.task('minjs', function(){
    gulp.src([config.folders.js.angular])
        .pipe(plumber())
        .pipe(gulpif(prod, uglify()))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(config.folders.production.js))
        .pipe(browserSync.stream())
});

/**
 * @name ImageMinification
 * @desc Minifies imagaes size
 * @memberOf GulpConfig
 */
gulp.task('minimage', function(){
   gulp.src([config.folders.images.images, config.folders.images.img])
       .pipe(plumber())
       .pipe(imagemin({
           optimizationLevel: 7
       }))
       .pipe(gulp.dest(config.folders.production.images))
});

/**
 * @name CssMinification
 * @desc Minifies css files
 * @memberOf GulpConfig
 */
gulp.task('mincss', function(){
    gulp.src([
        config.folders.sass.all
    ])
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(config.folders.production.css))
        .pipe(browserSync.stream())
});

// WATCH TASK

/**
 * @name BrowserWatch
 * @desc Starts node.js server and opens website on localhost:5000, watches for any
 * html, css or js change and refreshes the brwser
 * @memberOf GulpConfig
 */
gulp.task('watch', function(){
    browserSync.init({
        server: {
            proxy: './'
        }
    });

   gulp.watch(['js/**/*.html']).on('change', browserSync.reload);

    watch(config.folders.js.angular, batch(function(events, done){
        gulp.start('minjs', done);
    }));

    watch(config.folders.sass.modules, batch(function(events, done){
        gulp.start('mincss', done);
    }));
});

// DEFAULT
/**
 * @name DefaultGulpTask
 * @desc Starts all tasks and prepares everything page for run
 * @memberOf GulpConfig
 */
gulp.task('default', ['angular', 'minjs', 'mincss']);