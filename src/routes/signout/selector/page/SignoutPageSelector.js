import { createStructuredSelector } from 'reselect';

import {
  signoutLoadingSelector,
} from 'selectors';

export default createStructuredSelector({
  isLoading: signoutLoadingSelector,
});
