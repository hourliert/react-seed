import { INFO } from 'constants/routes';

export default function getRoute(requireAuthFunctions) {
  return {
    path: INFO,
    onEnter: requireAuthFunctions.authentified,

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/info/container/page');
        callback(null, container);
      });
    },
  };
}
