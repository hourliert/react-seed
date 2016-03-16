import { createStructuredSelector } from 'reselect';

import {
  userSelector,
  sessionSelector,
  initialRenderTimeSelector,
} from 'selectors';

export default createStructuredSelector({
  user: userSelector,
  session: sessionSelector,
  initialRenderTime: initialRenderTimeSelector,
});
