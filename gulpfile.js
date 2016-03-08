var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

var paths = {
    sass: ['./scss/**/*.scss'],
    css: ['./www/css/**/*.css'],
    js: ['./www/app/**/*.js']
};

gulp.task('default', ['css', 'uglify']);

gulp.task('css', function (done) {
    var sassStream = gulp.src(paths.sass)
        .pipe(sass())
        .on('error', sass.logError);

    var cssStream = gulp.src(paths.css);

    merge(sassStream, cssStream)
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(concat('main.css'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/res/'))
        .on('end', done);
});

gulp.task('uglify', function (done) {
    gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(uglify({mangle: false}))
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('www/res/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['css']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['uglify']);
});