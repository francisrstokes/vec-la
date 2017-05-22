var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stripCode = require('gulp-strip-code');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('build_module', function(){
  return gulp.src('./src/vec.main.js')
      .pipe(rename('vec.module.js'))
      .pipe(stripCode({
        start_comment: 'start window exports',
        end_comment: 'end window exports',
      }))
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('build_window', function(){
  return gulp.src('./src/vec.main.js')
      .pipe(rename('vec.window.js'))
      .pipe(stripCode({
        start_comment: 'start exports',
        end_comment: 'end exports',
      }))
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(browserify())
      .pipe(gulp.dest('./dist/'));
});

gulp.task('build_all', ['build_module', 'build_window']);
gulp.task('default', ['build_all']);