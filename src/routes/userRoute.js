import { USER_HOME } from 'constants/routes';
import UserPage from 'containers/UserPage';

import indexRoute from './userIndexRoute';

export default function getRoutes(requireAuthFunctions) {
  return {
    path: USER_HOME,
    onEnter: requireAuthFunctions.user,
    component: UserPage,
    indexRoute,
  };
}
