import { SIGNIN } from 'constants/routes';
import SigninPage from 'routes/signin/container/page';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SIGNIN,
    onEnter: requireAuthFunctions.anon,
    component: SigninPage,
  };
}
