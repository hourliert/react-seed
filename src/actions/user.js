import { actionsCreatorFactory, annotator, AbstractActionsCreator } from 'retax';

import UserApi from 'api/UserApi';
import {
  GET_CURRENT_USER,
  SET_SELF_ENTITY,
} from 'constants/actions';
import ThemeActionsCreator from 'actions/theme';

@annotator.ActionsCreator({ // eslint-disable-line
  apis: {
    userApi: UserApi,
  },
  actionsCreators: {
    theme: ThemeActionsCreator,
  },
})
export default class UserActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  fetchCurrentUser = actionsCreatorFactory(
    GET_CURRENT_USER.value,
    () => ({
      asyncAwait: this.apis.userApi.getCurrent(),
      onResolve: ::this.fetchCurrentUserResolve,
    })
  );

  fetchCurrentUserResolve(resp, { dispatch }) {
    const { setAdminTheme, setUserTheme } = this.actionsCreators.theme;

    dispatch(resp.isAdmin ? setAdminTheme() : setUserTheme());
  }

  @annotator.action()
  setSelfEntity = actionsCreatorFactory(SET_SELF_ENTITY);
}
