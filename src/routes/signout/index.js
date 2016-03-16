import { SIGNOUT } from 'constants/routes';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SIGNOUT,
    onEnter: requireAuthFunctions.authentified,

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/signout/container/page');
        callback(null, container);
      });
    },
  };
}
