import warning from 'warning';

import { checkAccess } from 'helpers/auth';
import {
  SIGNIN,
  ROOT,
  USER,
  ADMIN,
} from 'constants/routes';

export function requireAuth(getState, requireLevel, nextState, replace) {
  try {
    const { currentSession } = getState();
    const accessLevel = currentSession.getIn(['value', 'accessLevel']).toObject();
    let redirectRoute;

    if (!checkAccess(requireLevel, accessLevel)) {
      switch (accessLevel.title) {
        case 'public':
          redirectRoute = SIGNIN;
          break;
        default:
          redirectRoute = ROOT;
      }

      if (redirectRoute) {
        replace({
          pathname: redirectRoute,
          search: nextState.location.search,
          query: nextState.location.query,
        });
      }
    }
  } catch (e) {
    warning(false, e.message);
  }
}

export function redirectAccordingToRole(getState, nextState, replace) {
  try {
    const { currentSession } = getState();
    const accessLevel = currentSession.getIn(['value', 'accessLevel']).toObject();
    let redirectRoute;

    switch (accessLevel.title) {
      case 'public':
        redirectRoute = SIGNIN;
        break;
      case 'user':
        redirectRoute = nextState.location.pathname.includes(USER) ? '' : USER;
        break;
      case 'admin':
        redirectRoute = nextState.location.pathname.includes(ADMIN) ? '' : ADMIN;
        break;
      default:
        redirectRoute = '';
    }

    if (redirectRoute) {
      replace({
        pathname: redirectRoute,
        search: nextState.location.search,
        query: nextState.location.query,
      });
    }
  } catch (e) {
    warning(false, e.message);
  }
}
