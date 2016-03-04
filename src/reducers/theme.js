import { handleActions } from 'redux-actions';

import { userTheme, adminTheme } from 'themes';
import {
  SET_ADMIN_THEME,
  SET_USER_THEME,
} from 'constants/themeActions';

export default handleActions({
  [SET_ADMIN_THEME]() {
    return adminTheme;
  },

  [SET_USER_THEME]() {
    return userTheme;
  },
}, userTheme);
