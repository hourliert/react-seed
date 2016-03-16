import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  SIGNOUT,
  GET_CURRENT_USER,
} from 'constants/actions';

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
