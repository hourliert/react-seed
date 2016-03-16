import { createStructuredSelector } from 'reselect';

import {
  themeSelector,
} from 'selectors';

export default createStructuredSelector({
  theme: themeSelector,
});
