import { createStructuredSelector } from 'reselect';

import {
  signoutLoadingSelector,
} from 'selectors/resourceSelectors';

export default createStructuredSelector({
  isLoading: signoutLoadingSelector,
});
