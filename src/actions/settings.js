import { createAction } from 'redux-actions';

import {
  TOGGLE_SETTING,
} from 'constants/settingsActions';

export const toggleSetting = createAction(TOGGLE_SETTING);
