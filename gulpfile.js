var gulp = require('gulp');
var sass = require('gulp-sass');
var include = require('gulp-include');
const image = require('gulp-image');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var path = {
  scss: ['./dev/sass/*.scss', './dev/sass/**/*.scss']
}

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
  gulp.src("./dev/index.html")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("app/"));
});
gulp.task("style-include", ['sass'], function () {
  console.log("-- gulp is running task 'style-include'");
  return gulp.src("./dev/css/style.css")
    .pipe(sass())
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("app/css"));
});

gulp.task('image-optimize', ['img-include'], function () {
  gulp.src('./app/assets/*')
    .pipe(image())
    .pipe(gulp.dest('./app/assets'));
});

gulp.task('img-include', function () {
  gulp.src(['./dev/assets/*.png', './dev/assets/*.jpg', './dev/assets/*.svg'])
    .pipe(gulp.dest('./app/assets'))
});

gulp.task('css-min', ['autoprefixer'], function () {
  gulp.src('app/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'));
});
gulp.task('autoprefixer', ['style-include'], function () {
  gulp.src('./app/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/css'));
});


gulp.task('run', ['sass', 'browser-sync']);
gulp.task('build', [
  'index-include',
  'image-optimize',
  'css-min'
], function () {
  console.log('build end');
});
