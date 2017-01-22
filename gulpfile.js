(() => {

  'use strict';

  // *** dependencies *** //

  const path = require('path');
  const gulp = require('gulp');
  const jscs = require('gulp-jscs');
  const runSequence = require('run-sequence');
  const nodemon = require('gulp-nodemon');
  const plumber = require('gulp-plumber');
  const server = require('tiny-lr')();
  const prefix = require('gulp-autoprefixer');
  const cleanCSS = require('gulp-clean-css');
  const rename = require('gulp-rename');
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');
  const eslint = require('gulp-eslint');

  // *** config *** //

  const paths = {
    scripts: [
      path.join('src', '**', '*.js'),
      path.join('src', '*.js')
    ],
    styles: [
      path.join('src', 'client', 'css', '*.css')
    ],
    views: [
      path.join('src', 'server', '**', '*.html'),
      path.join('src', 'server', '*.html')
    ],
    server: path.join('src', 'server', 'server.js')
  };

  const lrPort = 35729;

  const nodemonConfig = {
    script: paths.server,
    ext: 'html js css',
    ignore: ['node_modules'],
    env: {
      NODE_ENV: 'development'
    }
  };

  // *** default task *** //

  gulp.task('default', () => {
    runSequence(
      ['lint'],
      ['jscs'],
      ['lr'],
      ['nodemon'],
      ['watch']
    );
  });

  // *** build task *** //

  gulp.task('build', () => {
    runSequence(
      ['minify-css'],
      ['minify-js']
    );
  });

  // *** sub tasks ** //

  gulp.task('lint', () => {
    return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  });

  gulp.task('jscs', () => {
    return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
  });

  gulp.task('styles', () => {
    return gulp.src(paths.styles)
    .pipe(plumber());
  });

  gulp.task('views', () => {
    return gulp.src(paths.views)
    .pipe(plumber());
  });

  gulp.task('lr', () => {
    server.listen(lrPort, (err) => {
      if (err) return console.error(err);
    });
  });

  gulp.task('nodemon', () => {
    return nodemon(nodemonConfig);
  });

  gulp.task('watch', () => {
    gulp.watch(paths.views, ['views']);
    gulp.watch(paths.scripts, ['jshint', 'jscs']);
    gulp.watch(paths.styles, ['styles']);
  });

  gulp.task('minify-css', () => {
    gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(concat('main.min.css'))
    .pipe(prefix({ cascade: true }))
    .pipe(cleanCSS({ debug: true }))
    .pipe(gulp.dest(path.join('src', 'client', 'css', 'dist')));
  });

  gulp.task('minify-js', () => {
    gulp.src(path.join('src', 'client', 'js', '*.js'))
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join('src', 'client', 'js', 'dist')));
  });

})();
