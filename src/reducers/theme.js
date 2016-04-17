import { reducerFactory } from 'retax';

import { userTheme, adminTheme } from 'themes';
import {
  SET_ADMIN_THEME,
  SET_USER_THEME,
} from 'constants/actions';

export default reducerFactory(
  userTheme,
  {
    [SET_ADMIN_THEME]() {
      return adminTheme;
    },

    [SET_USER_THEME]() {
      return userTheme;
    },
  }
);
