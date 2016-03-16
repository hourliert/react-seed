import { USER } from 'constants/routes';
import container from 'routes/user/container/page';
import getIndexRoute from 'routes/user/indexRoute';

export default function getRoute(requireAuthFunctions) {
  return {
    path: USER,
    onEnter: requireAuthFunctions.user,
    component: container,
    indexRoute: getIndexRoute(),
  };
}
