import { DOCUMENTATION } from 'constants/routes';

export default function getRoute(requireAuthFunctions) {
  return {
    path: DOCUMENTATION,
    onEnter: requireAuthFunctions.user,

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/documentation/container/page');
        callback(null, container);
      });
    },
  };
}
