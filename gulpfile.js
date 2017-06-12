var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stripCode = require('gulp-strip-code');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

var babelConfig = {
    presets: ['es2015'],
    plugins: ['babel-plugin-transform-object-rest-spread']
};
var src = './src/vec.main.js';
var dest = './dist/';

gulp.task('build_module', function(){
  return gulp.src(src)
      .pipe(rename('vec.module.js'))
      .pipe(stripCode({
        start_comment: 'start window exports',
        end_comment: 'end window exports',
      }))
      .pipe(babel(babelConfig))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('build_window', function(){
  return gulp.src(src)
      .pipe(rename('vec.window.js'))
      .pipe(stripCode({
        start_comment: 'start exports',
        end_comment: 'end exports',
      }))
      .pipe(babel(babelConfig))
      .pipe(browserify())
      .pipe(gulp.dest(dest));
});

gulp.task('build_all', ['build_module', 'build_window']);
gulp.task('default', ['build_all']);