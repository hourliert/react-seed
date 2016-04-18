import { actionsCreatorFactory, annotator, AbstractActionsCreator } from 'retax';

import {
  SET_USER_THEME,
  SET_ADMIN_THEME,
} from 'constants/actions';

@annotator.ActionsCreator() // eslint-disable-line
export default class ThemeActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  setUserTheme = actionsCreatorFactory(SET_USER_THEME);

  @annotator.action()
  setAdminTheme = actionsCreatorFactory(SET_ADMIN_THEME);
}
