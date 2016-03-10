console.log(`Booting...`); //eslint-disable-line

import { join } from 'path';
import Express from 'express';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import warning from 'warning';
import debug from 'debug';

import makeIsomorphicConfig from '../webpack.isomorphic.config';
import { FRONTEND_SERVER_PORT, SERVER_RENDERING } from 'config/frontEndServer';
import * as apiServerConfig from 'config/apiServer';
import * as frontEndServerConfig from 'config/frontEndServer';
import configManager from 'helpers/configManager';

configManager.setConfig({
  ...apiServerConfig,
  ...frontEndServerConfig,
});

const logger = debug('react-seed-serverEntry');

async function initIsomorphicAssets(context) {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    makeIsomorphicConfig(context)
  ).development(__DEVELOPMENT__);

  try {
    await global.webpackIsomorphicTools.server(context);
  } catch (e) {
    warning(false, e);
  }
}

logger('main: Initializing assets');
initIsomorphicAssets(join(__dirname, '../src'));
logger('main: Done');

const app = global.server = new Express();
const port = FRONTEND_SERVER_PORT;

app.set('port', (process.env.PORT || port));

app.use(morgan('dev'));
app.use(favicon(join(__dirname, '/public/favicon.ico')));
app.use(cookieParser());
app.use('/public', Express.static(join(__dirname, './public')));

if (__ONBUILD_SERVER_RENDERING__ && SERVER_RENDERING) {
  // attach the react server renderer to the express app
  app.use(/^(?!\/public\/.*).*$/, require('./server/rendering')());
} else {
  // attach a simple middleware to handle static serving
  app.use(/^(?!\/public\/.*).*$/, require('./server/static')());
}

console.log(`Starting front-end server`); //eslint-disable-line
app.listen(port, (error) => {
  if (error) {
    warning(false, error);
  } else {
    console.log(`==> 🌎  The server is running on port ${port}`); //eslint-disable-line
  }
});
