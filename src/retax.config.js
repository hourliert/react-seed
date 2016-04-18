import React from 'react';

import {
  untrackedStates,
  API_SERVER_HOSTNAME,
  API_SERVER_PORT,
  REDUX_DEVTOOLS,
  API_TOKEN_HEADER_KEY,
} from 'config';
import getMiddlewares from 'store';
import * as reducers from 'reducers';
import getRootRoute from 'routes';

import LifecycleActionsCreator from 'actions/lifecycle';

export default isServer => {
  let DevTools;
  if (REDUX_DEVTOOLS && !isServer) {
    DevTools = require('helpers/components/DevTools');
  }

  return {
    lifecycle: LifecycleActionsCreator,
    react: {
      appendChild: DevTools && <DevTools />,
    },
    router: {
      dynamic: (store, userAgent) => getRootRoute(store, userAgent),
    },
    store: {
      nonImmutableKeys: untrackedStates,
      middlewares: getMiddlewares(isServer),
      reducers,
      storeEnhancers: [
        DevTools && DevTools.instrument(),
      ],
    },
    api: {
      authHeaderName: API_TOKEN_HEADER_KEY,
      baseUrl: `${API_SERVER_HOSTNAME}:${API_SERVER_PORT}`,
    },
  };
};
