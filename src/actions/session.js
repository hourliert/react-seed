import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { apiThunkCreator, wrapWithPromise } from 'helpers/actions';
import {
  setAuthCredentials,
  removeAuthCredentials,
} from 'helpers/cookieManager';
import { createApiConfig } from 'helpers/api';

import {
  SIGNIN,
  AWAIT_SIGNIN,
  SIGNOUT,
  GET_CURRENT_SESSION,
} from 'constants/sessionActions';
import {
  SIGNIN as SIGNIN_ROUTE,
  HOME,
} from 'constants/routes';
import { initializeApis } from 'actions/app';
import { fetchCurrentUser } from 'actions/user';
import { setUserTheme } from 'actions/theme';

export const _fetchCurrentSessionCreator = createAction(
  GET_CURRENT_SESSION.value,
  ({ api }) => ({ asyncAwait: api.getCurrent() })
);

export const _signinCreator = createAction(
  SIGNIN.value,
  ({ api, ...args }) => ({
    asyncAwait: api.login(args),
    async onResolve(resp, { dispatch }) {
      const { token } = resp;
      const apiConfig = createApiConfig({ token });

      setAuthCredentials(token);
      dispatch(initializeApis(apiConfig));

      await Promise.all([
        dispatch(fetchCurrentUser()),
      ]);

      dispatch(push(HOME));
    },

    onReject() {
      removeAuthCredentials();
    },
  })
);

export const _signoutCreator = createAction(
  SIGNOUT.value,
  ({ api }) => ({
    asyncAwait: api.logout(),
    onResolve(resp, { dispatch }) {
      removeAuthCredentials();
      dispatch(push(SIGNIN_ROUTE));
      dispatch(setUserTheme());
    },

    onReject(resp, { dispatch }) {
      removeAuthCredentials();
      dispatch(setUserTheme());
    },
  })
);

export const fetchCurrentSession = apiThunkCreator('SessionApi', _fetchCurrentSessionCreator);

export const signin = apiThunkCreator('SessionApi', _signinCreator);
export const awaitSignin = wrapWithPromise(AWAIT_SIGNIN, signin);

export const signout = apiThunkCreator('SessionApi', _signoutCreator);
