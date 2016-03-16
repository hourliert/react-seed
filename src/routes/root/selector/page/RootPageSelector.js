import { createStructuredSelector } from 'reselect';

import {
  accessLevelSelector,
  errorsMapSelector,
  menusSelector,
  leftNavOpenSelector,
  appBarDepthSelector,
} from 'selectors';

export default createStructuredSelector({
  currentAccessLevel: accessLevelSelector,
  errors: errorsMapSelector,
  menus: menusSelector,
  leftNavOpen: leftNavOpenSelector,
  appBarDepth: appBarDepthSelector,
});
