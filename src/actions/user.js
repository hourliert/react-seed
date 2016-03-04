import { createAction } from 'redux-actions';

import {
  GET_CURRENT_USER,
  SET_SELF_ENTITY,
  MARK_USER_ERROR_AS_VIEWED,
} from 'constants/userActions';
import {
  setUserTheme,
  setAdminTheme,
} from 'actions/theme';
import { apiThunkCreator } from 'helpers/actions/apiThunkCreator';

export const markUserErrorAsViewed = createAction(MARK_USER_ERROR_AS_VIEWED);

export const _fetchCurrentUserCreator = createAction(
  GET_CURRENT_USER.value,
  ({ api }) => ({
    asyncAwait: api.getCurrent(),
    onResolve(resp, { dispatch }) {
      dispatch(resp.isAdmin ? setAdminTheme() : setUserTheme());
    },
  })
);

export const fetchCurrentUser = apiThunkCreator('UserApi', _fetchCurrentUserCreator);
export const setSelfEntity = createAction(SET_SELF_ENTITY);
