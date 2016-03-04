import React, { PropTypes } from 'react';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Html from 'helpers/components/Html';

export default function buildApp({
  store,
  history,
  renderProps,
  config: {
    userAgent,
    ...config,
  },
}) {
  const component = (
    <Provider store={store} key="provider">
      <div className="flex layout vertical">
        <RouterContext {...renderProps} history={history} />
      </div>
    </Provider>
  );

  const assets = global.webpackIsomorphicTools.assets();

  // `Html` is a react component that simply displays a html skeleton
  return (
    <Html
      component={component}
      config={config}
      store={store}
      assets={assets}
      radiumConfig={{ userAgent }}
    />
  );
}

buildApp.propTypes = {
  store: PropTypes.object,
  renderProps: PropTypes.object,
  history: PropTypes.object,
  config: PropTypes.object,
};
