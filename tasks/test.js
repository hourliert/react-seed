import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import babel from 'babel-core';

export function preTest() {
  return gulp.src(['./src/**/*.js'])
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter,
    }))
    .pipe(istanbul.hookRequire());
}

export function test() {
  require('./null-compiler');
  return gulp.src('./src/**/*-test.js', { read: false })
    .pipe(mocha({
      compilers: {
        js: babel,
      },
      timeout: 5000,
      reporter: 'spec',
    }));
}

export function coverage() {
  require('./null-compiler');
  return gulp.src('./src/**/*-test.js', { read: false })
    .pipe(mocha({
      compilers: {
        js: babel,
      },
      timeout: 5000,
      reporter: 'spec',
    }))
    .pipe(istanbul.writeReports());
}

export function tdd() {
  return gulp.watch('./src/**/*.js', ['test']);
}
