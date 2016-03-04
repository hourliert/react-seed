import gutil from 'gulp-util';
import webpack from 'webpack';
import config from '../webpack.config';

const WATCH = process.argv.includes('serve');

function handleCompilation(err, stats) {
  if (err) {
    throw new gutil.PluginError('webpack', err);
  }

  gutil.log('[webpack]', stats.toString(config[0].stats));
}

/**
 * This task bundles the project thanks to webpack.
 * You should check the ../webpack.config.js to learn how it works
 * If the WATCH option is enable, webpack rebuilds the project on change.
 */
export function bundle(callback) {
  let nbBundles = 0;

  const compiler = webpack(WATCH ? config[1] : config);

  if (WATCH) {
    compiler.watch({
      aggregateTimeout: 200,
    }, (err, stats) => {
      nbBundles++;
      handleCompilation(err, stats);
      if (nbBundles === 1) {
        callback();
      }
    });
  } else {
    compiler.run((err, stats) => {
      handleCompilation(err, stats);
      callback();
    });
  }
}
