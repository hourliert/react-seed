import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import cookies from 'js-cookie';
import debug from 'debug';

import { SERVER_RENDERING } from 'config/frontEndServer';
import getAppRoutes from 'routes/appRoute';
import { buildApp, waitForPreboot } from 'client';
import configureStore from 'store';
import configManager from 'helpers/configManager';
import { serverToClient } from 'helpers/immutable';
import { untrackedStates } from 'config/client';

injectTapEventPlugin();

const logger = debug('react-seed-clientEntry');

// get initial state/config
const initialState = serverToClient(untrackedStates, window.__INITIAL_STATE__);
const initialConfig = window.__INITIAL_CONFIG__;

// set the global client config
configManager.setConfig(initialConfig);
const token = cookies.get(configManager.get('TOKEN_COOKIE_KEY'));
configManager.setConfig({ token });

// configure store and wait for session
const store = configureStore(initialState, browserHistory);
const routes = getAppRoutes(store, navigator.userAgent);
const history = syncHistoryWithStore(browserHistory, store);

waitForPreboot(store, !(__ONBUILD_SERVER_RENDERING__ && SERVER_RENDERING));

// get dom entry point
const rootElement = document.getElementById('root');

// get initial location
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
  // render
  logger('main: Rendering');
  render(
    buildApp({ store, routes, history }),
  rootElement);
  logger('main: Done');

  if (__ONBUILD_REDUX_DEVTOOLS__ && configManager.get('REDUX_DEVTOOLS')) {
    const DevTools = require('./containers/DevTools');
    logger('main: Rendering Devtools');
    render(
      buildApp({ store, routes, history, DevTools }),
    rootElement);
    logger('main: Done');
  }
});

if (__ONBUILD_REACT_PERF__ && configManager.get('REACT_PERF')) {
  window.Perf = require('react-addons-perf');
}
