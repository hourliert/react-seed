import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  SIGNIN,
  SIGNOUT,
  GET_CURRENT_SESSION,
  GET_CURRENT_USER,
} from 'constants/actions';
import { userRoles } from 'config/access';

function getInitialState() {
  return fromJS({
    value: { accessLevel: userRoles.public },
  });
}

function upgradeRole(state) {
  return state.updateIn(['value', 'accessLevel'], level => (
    (level.get('title') === 'admin') ? level : fromJS(userRoles.user)
  ));
}

export default reducerFactory(
  getInitialState(),
  {
    [SIGNIN.SUCCESS](state, action) {
      return upgradeRole(state.mergeIn(['value'], action.payload));
    },

    [SIGNIN.ERROR]: getInitialState,

    [SIGNOUT.SUCCESS]: getInitialState,
    [SIGNOUT.ERROR]: getInitialState,

    [GET_CURRENT_SESSION.SUCCESS](state, action) {
      return upgradeRole(state.mergeIn(['value'], action.payload));
    },

    [GET_CURRENT_SESSION.ERROR]: getInitialState,

    [GET_CURRENT_USER.SUCCESS](state, action) {
      return state.mergeIn(['value'], {
        accessLevel: action.payload.isAdmin ?
        userRoles.admin : userRoles.user,
      });
    },
  }
);
