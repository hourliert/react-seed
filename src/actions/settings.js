import { createAction } from 'redux-actions';

import {
  TOGGLE_SETTING,
} from 'constants/actions';

export const toggleSetting = createAction(TOGGLE_SETTING);
