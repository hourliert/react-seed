import { requireAuth, redirectAccordingToRole } from './redirect';
import { accessLevels } from 'config/access';

export default function getRoutes({ getState }, userAgent) {
  const redirectAccordingToRoleFunction = redirectAccordingToRole.bind(null, getState);
  const requireAuthFunctions = Object.keys(accessLevels).reduce((res, k) => ({
    ...res,
    [k]: requireAuth.bind(null, getState, accessLevels[k]),
  }), {});

  return {
    path: '/',
    indexRoute: { onEnter: redirectAccordingToRoleFunction },

    getComponents(location, callback) {
      require.ensure([], require => {
        const makeRootApp = require('containers/RootApp');
        callback(null, makeRootApp(userAgent));
      });
    },

    getChildRoutes(location, callback) {
      require.ensure([], require => {
        let routes = [];
        try {
          const getUserRoutes = require('./userRoute');
          const getAdminRoutes = require('./adminRoute');
          const getSigninRoute = require('./signinRoute');
          const getSignoutRoute = require('./signoutRoute');
          const getInfoRoute = require('./infoRoute');
          const defaultRoute = require('./defaultRoute');

          routes = [
            getSigninRoute(requireAuthFunctions),
            getSignoutRoute(requireAuthFunctions),
            getInfoRoute(requireAuthFunctions),
            getUserRoutes(requireAuthFunctions),
            getAdminRoutes(requireAuthFunctions),
            defaultRoute,
          ];
        } catch (e) {
          console.error(e); // eslint-disable-line
        } finally {
          callback(null, routes);
        }
      });
    },
  };
}
