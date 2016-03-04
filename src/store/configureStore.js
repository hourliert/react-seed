import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import authMiddleware from './authMiddleware';
import undefinedMiddleware from './undefinedMiddleware';
import asyncAwaitMiddleware from './asyncAwaitMiddleware';
import configManager from 'helpers/configManager';
import rootReducer from 'reducers';

/**
 * Configure and create the application store.
 * @param  {Object} initialState     Could be anything depending on your store model.
 * @param  {ReduxRouter} reduxReactRouter Redux router. Different between server and client
 * @param  {history} createHistory    History for the router. Different between server and client
 * @return {Object}                  The redux store
 */
export default function configureStore(initialState, history) {
  // store middlewares
  const reduxRouterMiddleware = routerMiddleware(history);

  const storeEnhancers = [
    applyMiddleware(...[
      undefinedMiddleware,
      thunk,
      asyncAwaitMiddleware({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
      }),
      authMiddleware,
      reduxRouterMiddleware,
      (__DEVELOPMENT__ && !global.server) ? createLogger() : null,
    ].filter(x => !!x)),
  ];

  if (__ONBUILD_REDUX_DEVTOOLS__ && !global.server && configManager.get('REDUX_DEVTOOLS')) {
    const DevTools = require('../containers/DevTools');
    storeEnhancers.push(DevTools.instrument());
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(...storeEnhancers)
  );

  // If we are on client and the webpackHotMiddleware is loaded in the client,
  // we allow reducers replacement.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
