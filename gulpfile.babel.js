import 'babel-polyfill';

import gulp from 'gulp';
import { copyPackage, copyFavicon } from './tasks/copy';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { launchServer } from './tasks/server';
import { clean } from './tasks/clean';
import { lintWithEslint, lintWithJscs } from './tasks/lint';
import { preTest, test, coverage, tdd } from './tasks/test';

gulp.task('clean', clean);

gulp.task('copypackage', ['clean'], copyPackage);
gulp.task('copyfavicon', ['clean'], copyFavicon);

gulp.task('bundle', ['copypackage', 'copyfavicon'], bundle);
gulp.task('server', ['bundle'], launchServer);
gulp.task('serve', ['server'], serve);

gulp.task('eslint', lintWithEslint);
gulp.task('jscs', lintWithJscs);

gulp.task('lint', ['eslint', 'jscs']);

gulp.task('pretest', preTest);
gulp.task('test', test);
gulp.task('coverage', ['pretest'], coverage);
gulp.task('tdd', ['test'], tdd);
