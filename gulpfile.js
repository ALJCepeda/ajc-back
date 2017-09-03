const gulp = require('gulp');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine');
const babel = require('gulp-babel');

gulp.task('tests.run', function () {
    return gulp.src('./tests/**/*.mjs')
      .pipe(babel())
      .pipe(jasmine({
        verbose:true
      }));
});

gulp.task('tests.watch', function () {
    gulp.watch([
      './tests/**/*.js',
      './src/**/*.js'
    ], ['tests.run']);
});

gulp.task('test', [ 'tests.watch', 'tests.run' ]);