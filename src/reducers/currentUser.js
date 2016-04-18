import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  SIGNOUT,
  GET_CURRENT_USER,
} from 'constants/actions';

function getInitialState() {
  return fromJS({ isLoading: false, value: {} });
}

export default reducerFactory(
  getInitialState(),
  {
    [GET_CURRENT_USER.SUCCESS](state, action) {
      return state.mergeIn(['value'], action.payload);
    },

    [GET_CURRENT_USER.ERROR]: getInitialState,

    [SIGNOUT.SUCCESS]: getInitialState,
    [SIGNOUT.ERROR]: getInitialState,
  }
);
