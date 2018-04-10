const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');
const runSequence = require('run-sequence');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const nodemon = require('gulp-nodemon');

gulp.task('create-folders', () => {
  if (!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
  }
});

gulp.task('build-js', () => {
  return gulp.src('./src/**/*.js')
    .pipe(cached('scripts'))
    .pipe(babel())
    .pipe(remember('scripts'))
    .pipe(gulp.dest((file) => {
      return path.normalize(file.base.replace('src', 'dist'));
    }));
});

gulp.task('build-html', () => {
    return gulp.src('./src/**/*.html')
      .pipe(gulp.dest((file) => {
        return path.normalize(file.base.replace('src', 'dist'));
      }));
});
gulp.task('watch', () => {
  return gulp.watch('./src/**/*.js', (vinyl) => {
    console.log(`Changed: ${vinyl.path}`);

    return runSequence('build-js');
  });
});

gulp.task('tests.watch', () => {
  return gulp.watch('./src/**/*.js', (vinyl) => {
    return runSequence('build-js', 'jasmine');
  });
});

gulp.task('jasmine', () => {
  return gulp.src('./dist/tests/**/*.js').pipe(jasmine());
});

gulp.task('run', () => {
  nodemon({
    script: './dist/index.js',
    watch: './src',
    exec: 'node -r dotenv/config',
    delay: '250'
  });
});

gulp.task('clean', () => {
  return gulp.src(['./dist', './logs' ])
             .pipe(clean());
});

gulp.task('build', sequence('clean', 'create-folders', 'build-js', 'build-html'));
gulp.task('start', sequence('build', 'watch', 'run'));
gulp.task('test', sequence('build', 'tests.watch', 'jasmine'));
