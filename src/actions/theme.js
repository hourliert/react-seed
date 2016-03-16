import { createAction } from 'redux-actions';

import {
  SET_USER_THEME,
  SET_ADMIN_THEME,
} from 'constants/actions';

export const setUserTheme = createAction(SET_USER_THEME);
export const setAdminTheme = createAction(SET_ADMIN_THEME);
