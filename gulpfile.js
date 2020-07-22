const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
}));

gulp.task('js', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
}));

gulp.task('serve', gulp.series ('sass', () => {
  browserSync.init({
    server: './src'
  });

  gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ], gulp.parallel(['sass']));

  gulp.watch('src/*.html').on('change', gulp.parallel(browserSync.reload));

}));

gulp.task('font-awesome', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
}))

gulp.task('fonts', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
}));

gulp.task('default', gulp.parallel('js', 'serve', 'font-awesome', 'fonts'));
