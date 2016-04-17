import { reducerFactory } from 'retax';

import {
  SIGNIN,
  SIGNOUT,
  INFO,
  USER,
  ADMIN,
} from 'constants/routes';
import { accessLevels } from 'config/access';

export default reducerFactory(
  [
    {
      icon: 'account_circle',
      label: 'Sign In',
      url: SIGNIN,
      accessLevel: accessLevels.anon,
    },
    {
      icon: 'home',
      label: 'User Home',
      url: USER,
      accessLevel: accessLevels.user,
      withDivider: true,
    },
    {
      icon: 'home',
      label: 'Admin Home',
      url: ADMIN,
      accessLevel: accessLevels.admin,
      withDivider: true,
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
  ],
  {}
);
