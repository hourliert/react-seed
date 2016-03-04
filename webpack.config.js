import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import webpack from 'webpack';
import MutliProgress from 'multi-progress';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import SplitByPathPlugin from 'webpack-split-by-path';
import tty from 'tty';
import makeIsomorphicConfig, { alias } from './webpack.isomorphic.config';

const REGULAR_EXPRESSION = 'regular_expression';

let multi;
let clientBar;
let serverBar;

const IS_WIN = /^win/.test(process.platform) || !tty.isatty(process.stdout.fd);
const DEBUG = !process.argv.includes('--release');
const ONBUILD_REDUX_DEVTOOLS = process.argv.includes('--devtools');
const ONBUILD_REACT_PERF = process.argv.includes('--react-perf');
const ONBUILD_SERVER_RENDERING = process.argv.includes('--isomorphic');
const VERBOSE = process.argv.includes('--verbose');
const WATCH = process.argv.includes('serve');

const GLOBALS = {
  __ONBUILD_SERVER_RENDERING__: ONBUILD_SERVER_RENDERING || DEBUG,
  __ONBUILD_REDUX_DEVTOOLS__: ONBUILD_REDUX_DEVTOOLS || DEBUG,
  __ONBUILD_REACT_PERF__: ONBUILD_REACT_PERF || DEBUG,
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEVELOPMENT__: DEBUG,
  __PRODUCTION__: !DEBUG,
};
const JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: __dirname,
  loader: 'babel',
  query: {
    cacheDirectory: true,
  },
};

if (!IS_WIN) {
  multi = new MutliProgress();
  clientBar = multi.newBar('Client [:bar] :percent :elapsed s', {
    total: 100,
    clear: true,
  });
  serverBar = multi.newBar('Server [:bar] :percent :elapsed s', {
    total: 100,
    clear: true,
  });
}

const context = join(resolve(__dirname), './src');
const webpackAlias = Object.keys(alias).reduce((cur, k) => ({
  ...cur,
  [k]: join(context, alias[k]),
}), {});

const isomorphicToolsPlugin = new IsomorphicToolsPlugin(
  makeIsomorphicConfig(context)
).development(DEBUG);

const nodeModules = readdirSync(join(resolve(__dirname), './node_modules'))
  .filter(x => !['.bin'].includes(x));

// Common config. Used both for client and server.
const commonConfig = {
  context,

  output: {
    publicPath: '/public/',
  },

  resolve: {
    root: resolve(__dirname),
    alias: webpackAlias,
  },

  cache: DEBUG,
  debug: VERBOSE,
  verbose: VERBOSE,
  displayErrorDetails: VERBOSE,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: isomorphicToolsPlugin[REGULAR_EXPRESSION]('images'),
        loader: 'url-loader?limit=10240',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },
};

// Client specific config. We merge the new config with the common config.
const appConfig = Object.assign({}, commonConfig, {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  entry: {
    client: [
      'babel-polyfill',
      ...(WATCH ? ['webpack-hot-middleware/client'] : []),
      './clientEntry.js',
    ],
  },

  output: {
    ...commonConfig.output,
    path: join(__dirname, './build/public'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  resolve: {
    ...commonConfig.resolve,
  },

  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin(GLOBALS),
    isomorphicToolsPlugin,
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: join(__dirname, 'node_modules'),
      },
    ]),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
    ...(!IS_WIN ? [
      new webpack.ProgressPlugin((percentage) => {
        clientBar.update(percentage);
      }),
    ] : []),
  ],

  module: {
    loaders: [
      WATCH ? {
        ...JS_LOADER,
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                },
              ],
            },
           ],
          ],
        },
      } : JS_LOADER,
      ...commonConfig.module.loaders,
    ],
  },
});

// Server specific config. We merge the new config with the common config.
const serverConfig = Object.assign({}, commonConfig, {
  devtool: 'source-map',

  entry: {
    server: [
      'babel-polyfill',
      './serverEntry.js',
    ],
  },

  output: {
    ...commonConfig.output,
    path: join(__dirname, './build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    ...commonConfig.resolve,
    packageMains: ['webpack', 'web', 'browserify', ['jam', 'main'], 'main', 'browser'],
  },

  target: 'node',

  externals: nodeModules,

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false,
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
    ] : []),
    ...(!IS_WIN ? [
      new webpack.ProgressPlugin((percentage) => {
        serverBar.update(percentage);
      }),
    ] : []),
  ],

  module: {
    loaders: [
      JS_LOADER,
      ...commonConfig.module.loaders,
    ],
  },
});

export default [appConfig, serverConfig];
