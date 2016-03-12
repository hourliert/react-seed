import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { fromJS } from 'immutable';
import warning from 'warning';
import debug from 'debug';

import configureStore from 'store';
import getAppRoutes from 'routes/appRoute';
import buidApp from './buildApp';
import { getInitialState, waitForPreboot } from './hydrateClient';

import configManager from 'helpers/configManager';

const logger = debug('<%= appname %>-serverRendering');

export default function serverRendering() {
  return async function middleware(req, res, next) {
    const userAgent = req.headers['user-agent'];

    if (__DEVELOPMENT__) {
      global.webpackIsomorphicTools.refresh();
    }

    try {
      const initialState = {
        app: fromJS({
          initialRenderTime: +new Date(),
        }),
      };

      const history = createMemoryHistory();
      const store = configureStore(initialState, history);
      const routes = getAppRoutes(store, userAgent);

      try {
        // fetch the user session to define its role
        await waitForPreboot(store, req.cookies);
      } catch (e) {
        warning(false, e);
      }

      match({
        routes,
        location: req.originalUrl,
        history,
      }, async function matchCallback(error, redirectLocation, renderProps) {
        try {
          if (error) {
            warning(false, error);
            res.status(500).send(error);
          } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
          } else if (renderProps) {
            const { components } = renderProps;

            try {
              // fetch component needed data
              await getInitialState(components, store, { query: req.query });
            } catch (e) {
              warning(false, e);
            }

            const html = buidApp({
              store,
              history,
              renderProps,
              config: {
                userAgent,
                ...configManager.config,
              },
            });

            logger('serverRenderingMiddleware: Rendering');
            const markup = renderToString(html);
            logger('serverRenderingMiddleware: Done');

            res.status(200).send(markup);
          } else {
            res.status(404).send('Not found');
          }
        } catch (e) {
          warning(false, e);
          next(e);
        }
      });
    } catch (e) {
      warning(false, e);
      next(e);
    }
  };
}
