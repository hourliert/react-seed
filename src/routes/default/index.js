import { DEFAULT } from 'constants/routes';
import DefaultPage from 'routes/default/container/page';

export default function getRoute() {
  return {
    path: DEFAULT,
    component: DefaultPage,
  };
}
