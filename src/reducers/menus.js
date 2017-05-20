import { reducerFactory } from 'retax';

import {
  SIGNIN,
  USER,
  DOCUMENTATION,
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
      icon: 'book',
      label: 'Documentation',
      url: DOCUMENTATION,
      accessLevel: accessLevels.user,
      withDivider: true,
    },
  ],
  {}
);
