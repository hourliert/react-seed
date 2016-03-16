import { ADMIN } from 'constants/routes';
import container from 'routes/admin/container/page';
import getIndexRoute from 'routes/admin/indexRoute';

export default function getRoute(requireAuthFunctions) {
  return {
    path: ADMIN,
    onEnter: requireAuthFunctions.admin,
    component: container,
    indexRoute: getIndexRoute(),
  };
}
