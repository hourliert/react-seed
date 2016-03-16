import { SIGNIN } from 'constants/routes';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SIGNIN,
    onEnter: requireAuthFunctions.anon,

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/signin/container/page');
        callback(null, container);
      });
    },
  };
}
