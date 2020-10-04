gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifyInline = require('gulp-minify-inline');
gulp.task('app', () => {
    return gulp.src(['./public/js/*.js'])

        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())

        .pipe(gulp.dest('./dist/js'))
})
gulp.task('ace', () => {
    return gulp.src(['./public/ace/*.js'])

        .pipe(plumber())
        .pipe(concat('ace.js'))

        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())

        .pipe(gulp.dest('./dist/ace'))
})
gulp.task('pages', function() {
    return gulp.src(['./public/views/*.html'])
    .pipe(minifyInline())
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./dist/views'));
  });