/**
 * This task builds and launches the node.js server.
 * This node.js server serves the application.
 * Even if the server rendering is disabled, the server serves the
 * static website.
 * Then it launches browser-sync to proxy requests to the node.js server.
 * Browser-sync allows live reloading ONLY if a public ressource has changed.
 * For all other changes (like react components, component css, etc...),
 * the webpackHotMiddleware reload the changing part of the app.
 */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import BrowserSync from 'browser-sync';
import webpackConfig from '../webpack.config';

const bundler = webpack(webpackConfig[0]); // client configuration
const browserSync = BrowserSync.create();

export function serve() {
  const proxyOptions = {
    target: 'localhost:5000',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig[0].output.publicPath,
        stats: webpackConfig[0].stats,
      }),
      webpackHotMiddleware(bundler),
    ],
  };

  browserSync.init({
    proxy: proxyOptions,

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/public/**/*.css',
      'build/public/**/*.html',

      // './build/server.js',
    ],
  });
}
