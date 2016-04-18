import { actionsCreatorFactory, annotator, AbstractActionsCreator } from 'retax';

import {
  TOGGLE_SETTING,
} from 'constants/actions';

@annotator.ActionsCreator() // eslint-disable-line
export default class SettingsActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  toggleSetting = actionsCreatorFactory(TOGGLE_SETTING);
}
