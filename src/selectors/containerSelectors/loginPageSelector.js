import { createStructuredSelector } from 'reselect';

import {
  signinLoadingSelector,
} from 'selectors/resourceSelectors';

export default createStructuredSelector({
  isLoading: signinLoadingSelector,
});
