import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  GET_CURRENT_USER,
} from 'constants/userActions';
import {
  SIGNOUT,
} from 'constants/sessionActions';

function getInitialState() {
  return fromJS({ isLoading: false, value: {} });
}

export default handleActions({
  [GET_CURRENT_USER.SUCCESS](state, action) {
    return state.mergeIn(['value'], action.payload);
  },

  [GET_CURRENT_USER.ERROR]: getInitialState,

  [SIGNOUT.SUCCESS]: getInitialState,
  [SIGNOUT.ERROR]: getInitialState,
}, getInitialState());
