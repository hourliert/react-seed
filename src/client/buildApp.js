import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
import debug from 'debug';

import configManager from 'helpers/configManager';

const logger = debug('ReactSeed-clientEntry');

function buildApp({ store, routes, history, DevTools }) { // eslint-disable-line
  return (
    <Provider store={store} key="provider">
      <div className="flex layout vertical">
        <Router
          routes={routes}
          history={history}
        />
        {DevTools ? <DevTools /> : null}
      </div>
    </Provider>
  );
}

export default function initialRender({
  store,
  routes,
  history,
  rootElement,
}) {
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
      const DevTools = require('helpers/components/DevTools');
      logger('main: Rendering Devtools');
      render(
        buildApp({ store, routes, history, DevTools }),
      rootElement);
      logger('main: Done');
    }
  });
}
