import { handleActions } from 'redux-actions';

import {
  SIGNIN,
  SIGNOUT,
  INFO,
  USER_HOME,
  ADMIN_HOME,
  ADMIN_SETTINGS,
} from 'constants/routes';
import { accessLevels } from 'config/access';

export default handleActions({
}, [
  {
    icon: 'account_circle',
    label: 'Sign In',
    url: SIGNIN,
    accessLevel: accessLevels.anon,
  },
  {
    icon: 'home',
    label: 'User Home',
    url: USER_HOME,
    accessLevel: accessLevels.user,
    withDivider: true,
  },
  {
    icon: 'home',
    label: 'Admin Home',
    url: ADMIN_HOME,
    accessLevel: accessLevels.admin,
    withDivider: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    url: ADMIN_SETTINGS,
    accessLevel: accessLevels.admin,
  },
  {
    icon: 'info',
    label: 'Info',
    url: INFO,
    accessLevel: accessLevels.authentified,
    withDivider: true,
  },
  {
    icon: 'power_settings_new',
    label: 'Sign Out',
    url: SIGNOUT,
    accessLevel: accessLevels.authentified,
  },
]);
