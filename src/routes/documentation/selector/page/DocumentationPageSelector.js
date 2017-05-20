import { createStructuredSelector } from 'reselect';

import {
  userSelector,
} from 'selectors';

export default createStructuredSelector({
  user: userSelector,
});
