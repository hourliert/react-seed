import { createStructuredSelector } from 'reselect';

import {
  themeSelector,
} from 'selectors/resourceSelectors';

export default createStructuredSelector({
  theme: themeSelector,
});
