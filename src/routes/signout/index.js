import { SIGNOUT } from 'constants/routes';
import SignoutPage from 'routes/signout/container/page';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SIGNOUT,
    onEnter: requireAuthFunctions.user,
    component: SignoutPage,
  };
}
