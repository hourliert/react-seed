import LogoutPage from 'containers/LogoutPage';
import { SIGNOUT } from 'constants/routes';

export default function getRoutes(requireAuthFunctions) {
  return {
    path: SIGNOUT,
    component: LogoutPage,
    onEnter: requireAuthFunctions.authentified,
  };
}
