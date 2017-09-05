const path = require('path');

const gulp = require('gulp');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');
const runSequence = require('run-sequence');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const nodemon = require('gulp-nodemon');

gulp.task('build', () => {
  return gulp.src('./src/**/*.js')
    .pipe(cached('scripts'))
    .pipe(babel())
    .pipe(remember('scripts'))
    .pipe(gulp.dest((file) => {
      return path.normalize(file.base.replace('src', 'dist'));
    }));
});

gulp.task('watch', () => {
  return gulp.watch('./src/**/*.js', (vinyl) => {
    console.log(`Changed: ${vinyl.path}`);

    return runSequence('build');
  });
});

gulp.task('tests.watch', function () {
  return gulp.watch('./src/**/*.js', (vinyl) => {
    return runSequence('build', 'jasmine');
  });
});

gulp.task('jasmine', () => {
  return gulp.src('./dist/tests/**/*.js').pipe(jasmine());
});

gulp.task('run', function () {
  nodemon({
    script: './dist/index.js',
    watch: './src',
    delay: '250'
  });
});

gulp.task('start', sequence([ 'build', 'watch' ], 'run'));
gulp.task('test', [ 'build', 'tests.watch', 'jasmine' ]);
