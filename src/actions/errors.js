import { createAction } from 'redux-actions';

import {
  MARK_ALL_ERRORS_AS_VIEWED,
  CLEAR_ERRORS,
  CLEAR_ERROR,
} from 'constants/errorsActions';

export const markAllErrorsAsViewed = createAction(MARK_ALL_ERRORS_AS_VIEWED);
export const clearErrors = createAction(CLEAR_ERRORS);
export const clearError = createAction(CLEAR_ERROR);
