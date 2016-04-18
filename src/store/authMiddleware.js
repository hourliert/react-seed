import { isError } from 'flux-standard-action';
import { push } from 'react-router-redux';
import { removeAuthToken } from 'retax';

import {
  SIGNIN,
} from 'constants/routes';

export default function authMiddleware({ dispatch }) {
  return next => action => {
    const shouldRedirect = isError(action) &&
      (action.payload.status === 401);

    if (shouldRedirect) {
      next(action);
      dispatch(removeAuthToken());
      return dispatch(push(SIGNIN));
    }

    return next(action);
  };
}
