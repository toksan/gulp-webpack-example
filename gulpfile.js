const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./public_html/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public_html/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public_html/scss/**/*.scss', ['sass']);
});

// webpack
const webpack = require('webpack-stream');
gulp.task('webpack', function () {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            watch: false,
            mode: 'production',
            output: {
                filename: 'index.js',
            },
        }))
        .pipe(gulp.dest('public_html/js/'));
});