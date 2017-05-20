import { createStructuredSelector } from 'reselect';

import {
  accessLevelSelector,
  errorsMapSelector,
  menusSelector,
  leftNavOpenSelector,
  appBarDepthSelector,
  userSelector,
} from 'selectors';

export default createStructuredSelector({
  currentAccessLevel: accessLevelSelector,
  errors: errorsMapSelector,
  menus: menusSelector,
  user: userSelector,
  leftNavOpen: leftNavOpenSelector,
  appBarDepth: appBarDepthSelector,
});
