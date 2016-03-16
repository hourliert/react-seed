import { createStructuredSelector } from 'reselect';

import {
  signinLoadingSelector,
} from 'selectors';

export default createStructuredSelector({
  isLoading: signinLoadingSelector,
});
