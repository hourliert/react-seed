import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import UserApi from 'api/UserApi';
import {
  GET_CURRENT_USER,
  SET_SELF_ENTITY,
  UPDATE_USER,
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

  @annotator.action()
  updateUser = actionsCreatorFactory(
    UPDATE_USER.value,
    (body) => ({
      asyncAwait: this.apis.userApi.updateUser(body),
    })
  );

  fetchCurrentUserResolve(resp, { dispatch }) {
    const { setAdminTheme, setUserTheme } = this.actionsCreators.theme;

    dispatch(resp.isAdmin ? setAdminTheme() : setUserTheme());
  }

  @annotator.action()
  setSelfEntity = actionsCreatorFactory(SET_SELF_ENTITY);
}
