const gulp = require('gulp');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine');



gulp.task('tests.run', function () {
    return gulp.src('./test/**/*.js')
            .pipe(jasmine({verbose:true}));
});

gulp.task('tests.watch', function () {
    gulp.watch([
      './tests/**/*.js',
      './src/**/*.js'
    ], ['tests.run']);
});

gulp.task('test', [ 'tests.watch', 'tests.run' ]);