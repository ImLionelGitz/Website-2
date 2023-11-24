var gulp = require("gulp")
var webpack = require('webpack-stream')
var scss = require('gulp-sass')(require('sass'))
var clean = require('gulp-clean')
var split = require('gulp-split-files')
var include = require('gulp-file-include')
var minify = require('gulp-clean-css')

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean({ force: true }))
})

gulp.task('copy', function () {
    return gulp.src('./assets/**')
        .pipe(gulp.dest('dist'))
})

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist'))
})

gulp.task('styles', function () {
    return gulp.src('./src/index.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(split())
        .pipe(minify({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'))
})

gulp.task("scripts", function () {
    return webpack(require('./webpack.config.js'))
        .pipe(gulp.dest('dist'))
})

gulp.task("default", gulp.series('clean', 'copy', 'html', 'styles', 'scripts'))