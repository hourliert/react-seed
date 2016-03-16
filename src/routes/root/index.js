import warning from 'warning';

import { requireAuth, redirectAccordingToRole } from './redirect';
import { accessLevels } from 'config/access';
import { ROOT } from 'constants/routes';

export default function getRoute({ getState }, userAgent) {
  const redirectAccordingToRoleFunction = redirectAccordingToRole.bind(null, getState);
  const requireAuthFunctions = Object.keys(accessLevels).reduce((res, k) => ({
    ...res,
    [k]: requireAuth.bind(null, getState, accessLevels[k]),
  }), {});

  return {
    path: ROOT,
    onEnter: requireAuthFunctions.public,
    indexRoute: { onEnter: redirectAccordingToRoleFunction },

    getComponent(location, callback) {
      require.ensure([], require => {
        const makeRootApp = require('routes/root/container/makeRootApp');
        const container = require('routes/root/container/page');
        callback(null, makeRootApp(userAgent, container));
      });
    },

    getChildRoutes(location, callback) {
      require.ensure([], require => {
        let routes = [];
        try {
          const getUserRoutes = require('routes/user');
          const getAdminRoutes = require('routes/admin');
          const getSigninRoute = require('routes/signin');
          const getSignoutRoute = require('routes/signout');
          const getInfoRoute = require('routes/info');
          const getDefaultRoute = require('routes/default');

          routes = [
            getSigninRoute(requireAuthFunctions),
            getSignoutRoute(requireAuthFunctions),
            getInfoRoute(requireAuthFunctions),
            getUserRoutes(requireAuthFunctions),
            getAdminRoutes(requireAuthFunctions),
            getDefaultRoute(requireAuthFunctions),
          ];
        } catch (e) {
          warning(false, e);
        } finally {
          callback(null, routes);
        }
      });
    },
  };
}
