import { trigger } from 'redial';
import { annotator, AbstractLifecycleManager } from 'retax-components';

import UserActionsCreator from 'actions/user';
import AppActionsCreator from 'actions/app';
import SessionActionsCreator from 'actions/session';
import CounterActionsCreator from 'actions/counter';

@annotator.LifecycleManager({ // eslint-disable-line
  actionsCreators: {
    app: AppActionsCreator,
    user: UserActionsCreator,
    session: SessionActionsCreator,
    counter: CounterActionsCreator,
  },
})
export default class LifecycleActionsCreator extends AbstractLifecycleManager {

  willResolveRoute(hasToken) {
    if (!hasToken) return undefined;

    return async dispatch => {
      const { app, session, user } = this.actionsCreators;

      dispatch(app.setInitialRenderTime());

      return await Promise.all([
        dispatch(session.fetchCurrentSession()),
        dispatch(user.fetchCurrentUser()),
      ]);
    };
  }

  didResolveRoute(renderProps) {
    return async dispatch => {
      const { components } = renderProps;
      const locals = {
        dispatch,
        counterActionsCreator: this.actionsCreators.counter,
      };

      return trigger('fetch', components, locals);
    };
  }

  historyDidChanged(location, renderProps) {
    return dispatch => {
      const { components } = renderProps;
      const locals = {
        dispatch,
        counterActionsCreator: this.actionsCreators.counter,
      };

      return trigger('defer', components, locals);
    };
  }
}
