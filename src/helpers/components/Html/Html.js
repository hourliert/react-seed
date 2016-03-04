import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

export default class Html extends Component {
  static propTypes = {
    config: PropTypes.object,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
  };

  render() {
    const { store, config, component, assets } = this.props;
    const content = renderToString(component);

    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />

          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body className="fullbleed layout vertical">
          <div
            id="root"
            className="flex layout vertical"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.__INITIAL_STATE__=${JSON.stringify(store.getState())};
                window.__INITIAL_CONFIG__=${JSON.stringify(config)};
              `,
            }}
            charSet="UTF-8"
          />
          {Object.keys(assets.javascript).map(script =>
            <script src={assets.javascript[script]} key={script} defer />
          )}
        </body>
      </html>
    );
  }
}
