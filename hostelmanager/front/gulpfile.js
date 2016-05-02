'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	templateCache = require('gulp-angular-templatecache'),
	prefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	uncss = require('gulp-uncss'),
	jshint = require('gulp-jshint'),
	browserSync = require('browser-sync'),
	rigger = require('gulp-rigger'),
	cssAdjustUrlPath = require('gulp-css-adjust-url-path'),
	urlAdjuster = require('gulp-css-url-adjuster'),
	reload = browserSync.reload;

var path = {
	production: {
		index: '../hostel/templates/hostel/',
		js:  '../static/js/',
        css: '../static/css/',
        font: '../static/font/',
	},
    build: { 
        templatecache: 'src/app/templatecache/'
    },
    src: { //Пути откуда брать исходники
        template: 'src/app/**/**/*.tpl.html',
        js: 'src/app/main.js', 
        vendor: 'src/app/vendor.js', 
        fonts: 'vendor/fonts/*.*',
        jshint: 'src/app/**/**/*.js',
        css: 'src/app/main.scss',
        html: 'src/index.html',

     },
    watch: { 
        template: 'src/app/**/**/*.tpl.html',
        js: 'src/app/**/**/*.js',
        css: 'vendor/css/*.css',
        html: 'src/index.html',
    },
    clean: './build'
};

gulp.task('js:jshint', function() {
    return gulp.src(path.src.jshint) //выберем файлы по нужному пути
        .pipe(jshint()) //прогоним через jshint
        .pipe(jshint.reporter('default')); //стилизуем вывод ошибок в консоль
});

gulp.task('js:tempcache', function () {
  return gulp.src(path.src.template)
    .pipe(templateCache({module: 'hostelApp'}))
    .pipe(gulp.dest(path.build.templatecache));
});

gulp.task('js:vendor', function () {
   return gulp.src(path.src.vendor) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({stream: true}));
        
});

gulp.task('js:build', function () {
   return gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({stream: true}));
        
});

gulp.task('css:uncss', function(){
	return gulp.src(path.src.css)
			.pipe(sass())
			.pipe(uncss({
				html: ['src/index.html', 'src/app/**/**/*.tpl.html', ]
			}))
			.pipe(cssmin())
			.pipe(urlAdjuster({
    			replace:  ['../../vendor/','../'],
  			}))
  			.pipe(cssmin())
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest(path.production.css));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.production.font))
});

gulp.task('html:index', function(){
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.production.index));

});

gulp.task('build',[
	'js:jshint',
	'html:index',
	'js:tempcache',
	'js:build',
	'css:uncss',
	]);

gulp.task('watch', function(){
    watch([path.watch.template], function(event, cb) {
        gulp.start('js:tempcache');
        gulp.start('js:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:uncss');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
     watch([path.watch.html], function(event, cb) {
        gulp.start('html:index');
    });
});
gulp.task('default', ['build']);



