import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import {
  TOGGLE_LEFTNAV,
  OPEN_LEFTNAV,
  CLOSE_LEFTNAV,
  SET_APP_BAR_DEPTH,
  SET_INITIAL_RENDER_TIME,
} from 'constants/actions';

@annotator.ActionsCreator() // eslint-disable-line
export default class AppActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  openLeftNav = actionsCreatorFactory(OPEN_LEFTNAV);

  @annotator.action()
  closeLeftNav = actionsCreatorFactory(CLOSE_LEFTNAV);

  @annotator.action()
  toggleLeftNav = actionsCreatorFactory(TOGGLE_LEFTNAV);

  @annotator.action()
  setAppBarDepth = actionsCreatorFactory(SET_APP_BAR_DEPTH);

  @annotator.action()
  setInitialRenderTime = actionsCreatorFactory(SET_INITIAL_RENDER_TIME);
}
