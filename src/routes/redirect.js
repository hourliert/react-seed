import warning from 'warning';

import { checkAccess } from 'helpers/auth';
import {
  SIGNIN,
  HOME,
  USER_HOME,
  ADMIN_HOME,
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
          redirectRoute = HOME;
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
        redirectRoute = nextState.location.pathname.includes(USER_HOME) ? '' : USER_HOME;
        break;
      case 'admin':
        redirectRoute = nextState.location.pathname.includes(ADMIN_HOME) ? '' : ADMIN_HOME;
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
