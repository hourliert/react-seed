import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import {
  TOGGLE_SETTING,
} from 'constants/actions';

@annotator.ActionsCreator() // eslint-disable-line
export default class SettingsActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  toggleSetting = actionsCreatorFactory(TOGGLE_SETTING);
}
