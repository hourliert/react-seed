import LoginPage from 'containers/LoginPage';
import { SIGNIN } from 'constants/routes';

export default function getRoutes(requireAuthFunctions) {
  return {
    path: SIGNIN,
    component: LoginPage,
    onEnter: requireAuthFunctions.anon,
  };
}
