import { push } from 'react-router-redux';
import {
  setAuthToken, removeAuthToken,
  actionsCreatorFactory,
} from 'retax';
import { AbstractActionsCreator, annotator } from 'retax-components';

import SessionApi from 'api/SessionApi';

import {
  SIGNIN,
  SIGNOUT,
  GET_CURRENT_SESSION,
} from 'constants/actions';
import {
  SIGNIN as SIGNIN_ROUTE,
  ROOT,
} from 'constants/routes';
import UserActionsCreator from 'actions/user';
import ThemeActionsCreator from 'actions/theme';

@annotator.ActionsCreator({ // eslint-disable-line
  apis: {
    session: SessionApi,
  },
  actionsCreators: {
    user: UserActionsCreator,
    theme: ThemeActionsCreator,
  },
})
export default class SessionActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  fetchCurrentSession = actionsCreatorFactory(
    GET_CURRENT_SESSION.value,
    () => ({ asyncAwait: this.apis.session.getCurrent() })
  );

  @annotator.action()
  signin = actionsCreatorFactory(
    SIGNIN.value,
    (args) => ({
      asyncAwait: this.apis.session.login(args),
      onResolve: ::this.signinResolve,
      onReject: ::this.signinReject,
    })
  );

  async signinResolve(resp, { dispatch }) {
    const { token } = resp;

    dispatch(setAuthToken(token));

    await Promise.all([
      dispatch(this.actionsCreators.user.fetchCurrentUser()),
    ]);

    dispatch(push(ROOT));
  }

  signinReject(resp, { dispatch }) {
    dispatch(removeAuthToken());
  }

  @annotator.action()
  signout = actionsCreatorFactory(
    SIGNOUT.value,
    () => ({
      asyncAwait: this.apis.session.logout(),
      onResolve: ::this.signoutResolve,
      onReject: ::this.signoutReject,
    })
  );

  signoutResolve(resp, { dispatch }) {
    dispatch(removeAuthToken());
    dispatch(push(SIGNIN_ROUTE));
    dispatch(this.actionsCreators.theme.setUserTheme());
  }

  signoutReject(resp, { dispatch }) {
    dispatch(removeAuthToken());
    dispatch(this.actionsCreators.theme.setUserTheme());
  }
}
