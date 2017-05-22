var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stripCode = require('gulp-strip-code');

gulp.task('build_module', function(){
  gulp.src('./src/vec.main.js')
      .pipe(stripCode({
        start_comment: 'start window exports',
        end_comment: 'end window exports',
      }))
      .pipe(browserify({
        sourceType: 'module'
      }))
      .pipe(gulp.dest('./dist_module/'));
});

gulp.task('build_window', function(){
  gulp.src('./src/vec.main.js')
      .pipe(stripCode({
        start_comment: 'start exports',
        end_comment: 'end exports',
      }))
      .pipe(browserify({
      }))
      .pipe(gulp.dest('./dist_window/'));
});

gulp.task('build_all', ['build_module', 'build_window']);

gulp.task('default', ['build_all']);