'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync');

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('styles', function() {
  return gulp.src(['src/styles/app.scss'])
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['src/scripts/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('browser-sync', ['styles', 'scripts'], function() {
    browserSync.init(null, {
        server: {
            baseDir: './dist'
        },
        host: "localhost"
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'browser-sync', 'watch');
});