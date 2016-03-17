import configManager from 'helpers/configManager';

function renderFullPage(html, state, config) {
  const assets = global.webpackIsomorphicTools.assets();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>ReactSeed</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body class="fullbleed layout vertical">
        <div
          id="root" class="flex layout vertical"
        >
          ${html}
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)};
          window.__INITIAL_CONFIG__ = ${JSON.stringify(config)};
        </script>
        ${
          Object.values(assets.javascript).map(script => (
            `<script src="${script}" defer></script>`
          )).join('')
        }
      </body>
    </html>
  `;
}

export default function staticRendering() {
  return function middleware(req, res) {
    if (__DEVELOPMENT__) {
      global.webpackIsomorphicTools.refresh();
    }

    res.status(200).send(renderFullPage(
      'Loading without server rendering...',
      {},
      {
        ...configManager.config,
      }
    ));
  };
}
