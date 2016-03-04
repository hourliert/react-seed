import { ADMIN_SETTINGS } from 'constants/routes';

export default {
  path: ADMIN_SETTINGS,
  getComponents(location, callback) {
    require.ensure([], require => {
      callback(null, require('containers/SettingsPage'));
    });
  },
};
