import { INFO } from 'constants/routes';

export default function getRoutes(requireAuthFunctions) {
  return {
    path: INFO,
    onEnter: requireAuthFunctions.authentified,
    getComponents(location, callback) {
      require.ensure([], require => {
        callback(null, require('containers/InfoPage'));
      });
    },
  };
}
