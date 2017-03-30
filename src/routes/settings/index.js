import { SETTINGS } from 'constants/routes';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SETTINGS,
    onEnter: requireAuthFunctions.user,

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/settings/container/page');
        callback(null, container);
      });
    },
  };
}
