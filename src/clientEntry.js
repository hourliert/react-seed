import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cookies from 'js-cookie';

import { SERVER_RENDERING, untrackedStates } from 'config/frontEndServer';
import getRootRoute from 'routes';
import { initialRender, waitForPreboot, setupRedial } from 'client';
import configureStore from 'store';
import configManager from 'helpers/configManager';
import { serverToClient } from 'helpers/immutable';

injectTapEventPlugin();

// get initial state/config
const initialState = serverToClient(untrackedStates, window.__INITIAL_STATE__);
const initialConfig = window.__INITIAL_CONFIG__;

// set the global client config
configManager.setConfig(initialConfig);
const token = cookies.get(configManager.get('TOKEN_COOKIE_KEY'));
configManager.setConfig({ token });

// configure store and wait for session
const store = configureStore(initialState, browserHistory);
const routes = getRootRoute(store, navigator.userAgent);
const history = syncHistoryWithStore(browserHistory, store);

waitForPreboot(store, !(__ONBUILD_SERVER_RENDERING__ && SERVER_RENDERING));

// get dom entry point
const rootElement = document.getElementById('root');

initialRender({
  store,
  history,
  routes,
  rootElement,
});

setupRedial({
  store,
  history,
  routes,
});

delete window.__INITIAL_STATE__;
delete window.__INITIAL_CONFIG__;

if (__ONBUILD_REACT_PERF__ && configManager.get('REACT_PERF')) {
  window.Perf = require('react-addons-perf');
}
