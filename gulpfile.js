var gulp = require("gulp")
var webpack = require('webpack-stream')
var scss = require('gulp-sass')(require('sass'))
var clean = require('gulp-clean')
var split = require('gulp-split-files')
var include = require('gulp-file-include')
var minifyCSS = require('gulp-clean-css')
var minifyHTML = require('gulp-htmlmin')
var replace = require('gulp-replace')
var postcss = require('gulp-postcss')
var injector = require('./plugins/gulp-css-injector.js')
const { existsSync } = require("fs")

function ReplaceImgPlaceholders(placeholder) {
    const image = placeholder.substring(7) + '.webp'
    const url = `https://res.cloudinary.com/dtcignhud/image/upload/v1700095152/${image}`

    return url
}

gulp.task('clean', function () {
    if (existsSync('./dist')) {
        return gulp.src('./dist', { read: false })
            .pipe(clean({ force: true }))
    }

    return new Promise((res) => res())
})

gulp.task('copy', function () {
    return gulp.src('./assets/**')
        .pipe(gulp.dest('dist'))
})

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(replace(/@image-\w+/gmi, ReplaceImgPlaceholders))
        .pipe(minifyHTML({ collapseWhitespace: true, removeComments: false }))
        .pipe(injector('./dist/css/essential.css'))
        .pipe(gulp.dest('dist'))
})

gulp.task('styles', function () {
    return gulp.src('./src/index.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(postcss())
        .pipe(split())
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
})


gulp.task("scripts", function () {
    return webpack(require('./webpack.config.js'))
        .pipe(gulp.dest('dist/js'))
})

gulp.task("default", gulp.series('clean', 'copy', 'styles', 'html', 'scripts'))