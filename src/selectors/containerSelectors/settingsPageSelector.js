import { createStructuredSelector } from 'reselect';

import {
  settingsListSelector,
} from 'selectors/resourceSelectors';

export default createStructuredSelector({
  settingsList: settingsListSelector,
});
