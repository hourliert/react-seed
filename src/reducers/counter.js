import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  GET_COUNTER,
} from 'constants/actions';

function getInitialState() {
  return fromJS({
    value: undefined,
  });
}

export default reducerFactory(
  getInitialState(),
  {
    [GET_COUNTER.SUCCESS](state, action) {
      return state.set('value', action.payload.counter);
    },
  }
);
