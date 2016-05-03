import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import {
  MARK_ALL_ERRORS_AS_VIEWED,
  CLEAR_ERRORS,
  CLEAR_ERROR,
} from 'constants/actions';

@annotator.ActionsCreator() // eslint-disable-line
export default class ErrorsActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  markAllErrorsAsViewed = actionsCreatorFactory(MARK_ALL_ERRORS_AS_VIEWED);

  @annotator.action()
  clearErrors = actionsCreatorFactory(CLEAR_ERRORS);

  @annotator.action()
  clearError = actionsCreatorFactory(CLEAR_ERROR);
}
