var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpWatch = require('gulp-watch');
var gulpLiteServer = require('gulp-live-server');
var include = require('gulp-include');
var browserSync = require('browser-sync').create();
var path = {
  scss: ['./dev/sass/*.scss', './dev/sass/**/*.scss']
}
// Static server
gulp.task('browser-sync', ['sass'], function () {
  browserSync.init({
    server: {
      baseDir: "./dev"
    }
  });

  gulp.watch("./app/css/*.css", ['sass']).on('change', browserSync.reload);
  gulp.watch(path.scss, ['sass']).on('change', browserSync.reload);
  gulp.watch("dev/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  gulp.src('./dev/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dev/css'));
  console.log('sass');
});

gulp.task("index-include", function () {
  console.log("-- gulp is running task 'index.html'");
  gulp.src("./index.html")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("app/"));
});

gulp.task('run', ['index-include', 'sass', 'browser-sync']);
