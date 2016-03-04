import gulp from 'gulp';
import replace from 'gulp-replace';

export function copyPackage() {
  return gulp.src('package.json')
    .pipe(replace(/"start".*/g, '"start": "node server.js"'))
    .pipe(gulp.dest('./build'));
}

export function copyFavicon() {
  return gulp.src('./src/images/favicon/favicon.ico')
    .pipe(gulp.dest('./build/public/'));
}
