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
      require.ensure([], () => {
        callback(null, []);
      });
    },
  };
}
