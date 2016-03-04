import { isError } from 'flux-standard-action';
import { push } from 'react-router-redux';
import { signout } from 'actions/session';

import {
  SIGNIN,
} from 'constants/routes';

export default function authMiddleware({ dispatch, getState }) {
  return next => action => {
    const { routing } = getState();
    const shouldRedirect = isError(action) &&
    (action.payload.code === 401) &&
    routing.location.pathname !== SIGNIN;

    if (shouldRedirect) {
      next(action);
      dispatch(signout());
      return dispatch(push(SIGNIN));
    }

    return next(action);
  };
}
