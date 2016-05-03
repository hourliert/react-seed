console.log(`Booting...`); //eslint-disable-line
import 'reflect-metadata';

import { join } from 'path';
import Express from 'express';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import warning from 'warning';
import debug from 'debug';
import { retaxMiddleware } from 'retax';

import { genStaticIndex, genDynamicIndex } from 'helpers/htmlIndex';

import getRetaxConfig from './retax.config';
import { makeIsomorphicConfig } from 'builder-react-fullstack';
import { FRONTEND_SERVER_PORT, SERVER_RENDERING } from 'config/frontEndServer';

const logger = debug('RetaxSeed-serverEntry');

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

app.use(retaxMiddleware({
  serverRendering: SERVER_RENDERING,
  staticIndex: genStaticIndex(global.webpackIsomorphicTools.assets()),
  dynamicIndex: genDynamicIndex(global.webpackIsomorphicTools.assets()),
  retaxConfig: getRetaxConfig(true),
}));

console.log(`Starting front-end server`); //eslint-disable-line
app.listen(port, (error) => {
  if (error) {
    warning(false, error);
  } else {
    console.log(`==> 🌎  The server is running on port ${port}`); //eslint-disable-line
  }
});
