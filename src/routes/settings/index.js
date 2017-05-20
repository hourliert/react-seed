import { SETTINGS } from 'constants/routes';
import SettingsPage from 'routes/settings/container/page';

export default function getRoute(requireAuthFunctions) {
  return {
    path: SETTINGS,
    onEnter: requireAuthFunctions.user,
    component: SettingsPage,
  };
}
