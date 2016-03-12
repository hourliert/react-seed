import React, { PropTypes } from 'react';
import debug from 'debug';
import warning from 'warning';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { runDeferrers } from 'decorators';

const logger = debug('<%= appname %>-buildApp');

export default function buildApp({
  store,
  routes,
  history,
  DevTools,
}) {
  // on router update, we fetch all the displayed component defer data
  async function onUpdate() {
    const { components } = this.state;

    logger('onUpdate: Running deferrers');
    try {
      await runDeferrers(components, {
        dispatch: store.dispatch,
      });
    } catch (e) {
      warning(false, e.message);
    } finally {
      logger('onUpdate: Done');
    }
  }

  return (
    <Provider store={store} key="provider">
      <div className="flex layout vertical">
        <Router
          routes={routes}
          history={history}
          onUpdate={onUpdate}
        />
        {DevTools ? <DevTools /> : null}
      </div>
    </Provider>
  );
}

buildApp.propTypes = {
  store: PropTypes.object,
  routes: PropTypes.object,
  history: PropTypes.object,
  DevTools: PropTypes.object,
};
