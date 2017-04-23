var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpWatch = require('gulp-watch');
var gulpLiteServer = require('gulp-live-server');


gulp.task('sass', ['sass:watch'], (cd) => {
  gulp.src('./dev/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
  console.log('sass');
  cd()
  //run('npm run dev');
  //exec('npm run dev');
});

gulp.task('sass:watch', (cd) => {
   gulpWatch('./dev/sass/**', () => {
    gulp.src('./dev/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('app/css'));
    console.log('sess:watch end');
    cd();
  })

});
