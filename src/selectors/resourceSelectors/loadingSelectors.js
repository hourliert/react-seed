import { createSelector } from 'reselect';

import {
  AWAIT_SIGNIN,
  SIGNOUT,
} from 'constants/actions';

export function loadingSelector(state) {
  return state.loading;
}

export const signinLoadingSelector = createSelector(
  loadingSelector,
  loading => loading.getIn(['value', AWAIT_SIGNIN.value, 'isLoading'])
);

export const signoutLoadingSelector = createSelector(
  loadingSelector,
  loading => loading.getIn(['value', SIGNOUT.value, 'isLoading'])
);
