var gulp = require('gulp');
var print = require('gulp-print');
var mainBowerFiles = require('main-bower-files');
var jsMinify = require('gulp-minify');
var cssMinify = require('gulp-css');
var htmlMinify = require('gulp-minify-html');
var chmod = require('gulp-chmod');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var beautify = require('gulp-beautify');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var symlink = require('gulp-sym');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var gulpStream = require('merge-stream');

var srcdir = '../client/';
var publishdir = '../server/public/';
var publishviewdir = '../server/views/';
var packageName = 'pepp';

var src = {
    css: [srcdir + 'assets/css/*.css'],
    img: [srcdir + 'assets/images/*.*'],
    js: [srcdir + 'assets/js/*.js'],
    app: [srcdir + 'app/*.js', srcdir + 'app/**/*.js'],
    template: [srcdir + 'app/**/*.html'],
    bower: ['bower.json', '.bowerrc']
};

var dist = {
    all: [publishdir + '/**/*'],
    css: publishdir + '/assets/css/',
    js: publishdir + '/assets/js/',
    img: publishdir + '/assets/images/',
    template: publishdir + 'assets/templates/',
    vendor: publishdir + '/bower_components/'
};

gulp.task('clean-all', function () {
    gulp.src([publishdir + '**/'])
        .pipe(clean({ force: true }));
});

gulp.task('clean', function () {
    gulp.src([publishdir + '*.html'])
        .pipe(clean({ force: true }));

    gulp.src([publishviewdir + '*.ejs'])
        .pipe(clean({ force: true }));

    gulp.src([publishdir + 'assets'])
        .pipe(clean({ force: true }));
});

gulp.task('bower', function () {
    gulp.src(mainBowerFiles({ base: 'bower_components' }))
        .pipe(filter('**/*.js'))
        .pipe(print())
        .pipe(gulp.dest(dist.vendor + 'js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.vendor + 'js'));

    gulp.src(mainBowerFiles({ base: 'bower_components' }).concat(['bower_components/bootstrap/dist/css/*', 'bower_components/font-awesome/css/*']))
        .pipe(filter('**/*.css'))
        .pipe(print())
        .pipe(gulp.dest(dist.vendor + 'css'))
        .pipe(cssMinify())
        .pipe(gulp.dest(dist.vendor + 'css'));

    gulp.src(mainBowerFiles({ base: 'bower_components' }).concat(['bower_components/bootstrap/fonts/*', 'bower_components/font-awesome/fonts/*']))
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(gulp.dest(dist.vendor + 'fonts'));
});

gulp.task('copy-resources', function () {
    gulp.src([srcdir + 'index.html'])
        .pipe(chmod(666))
        .pipe(gulp.dest(publishviewdir));

    /* CSS */
    var css = gulp.src(src.css);

    gulpStream(css)
        .pipe(concat('layout.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(cssMinify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.css));

    /* IMAGES */
    gulp.src(src.img)
        .pipe(chmod(666))
        .pipe(gulp.dest(dist.img));

    /* JS */
    gulp.src(src.js)
        .pipe(concat("application.js"))
        .pipe(beautify({ indentSize: 2 }))
        .pipe(gulp.dest(dist.js))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.js));
});

gulp.task('build-angular-app', function () {
    gulp.src(src.app)
        .pipe(concat(packageName + ".js"))
        .pipe(chmod(666))
        .pipe(beautify({
            jslint_happy: true,
            end_with_newline: true,
            keep_array_indentation: true,
            keep_function_indentation: true,
            indentSize: 2,
            indent_with_tabs: true
        }))
        .pipe(gulp.dest(dist.js))
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.js));
});

gulp.task('copy-templates', function () {
    gulp.src(src.template)
        .pipe(htmlMinify({ empty: true }))
        .pipe(templateCache({
            module: packageName + '.templates',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(/\.tpl\.html$/, '.html');
            }
        }))
        .pipe(beautify({ indentSize: 2 }))
        .pipe(gulp.dest(dist.template))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist.template));
});

gulp.task('release', ['bower', 'copy-resources', 'build-angular-app', 'copy-templates']);

gulp.task('autobuild', function () {
    gulp.watch(src.app, ['build-angular-app']);
    gulp.watch(src.template, ['copy-templates']);
});