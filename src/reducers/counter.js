import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  GET_COUNTER,
} from 'constants/actions';

function getInitialState() {
  return fromJS({
    value: undefined,
  });
}

export default handleActions({
  [GET_COUNTER.SUCCESS](state, action) {
    return state.set('value', action.payload.counter);
  },
}, getInitialState());
