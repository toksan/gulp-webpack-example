var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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