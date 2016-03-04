import { ADMIN_HOME } from 'constants/routes';
import AdminPage from 'containers/AdminPage';

import indexRoute from './adminIndexRoute';

export default function getRoutes(requireAuthFunctions) {
  return {
    path: ADMIN_HOME,
    onEnter: requireAuthFunctions.admin,
    component: AdminPage,
    indexRoute,

    getChildRoutes(location, callback) {
      require.ensure([], require => {
        let routes = [];
        try {
          const AdminSettingsRoute = require('./adminSettingsRoute');

          routes = [
            AdminSettingsRoute,
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
