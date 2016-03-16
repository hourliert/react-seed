import { createAction } from 'redux-actions';

import {
  UPDATE_LOADING_VALUE,
  SET_LOADING_STEPS,
} from 'constants/actions';

export const updateLoadingValue = createAction(UPDATE_LOADING_VALUE);
export const setLoadingSteps = createAction(SET_LOADING_STEPS);
