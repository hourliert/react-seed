import { createStructuredSelector } from 'reselect';

import { counterValueSelector } from 'selectors';

export default createStructuredSelector({
  counter: counterValueSelector,
});
