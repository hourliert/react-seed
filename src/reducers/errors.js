import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import * as ACTIONS from 'constants/actions';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

function updateError(ACTION, state, action) {
  return state.mergeIn(['value'], {
    [ACTION]: {
      viewed: false,
      error: action.payload,
    },
  });
}

const reducers = Object.values(ACTIONS).reduce((res, ACTION) => {
  if (!ACTION.ERROR) return res;

  return {
    ...res,
    [ACTION.ERROR]: updateError.bind(null, ACTION.value),
  };
}, {});

export default reducerFactory(
  getInitialState(),
  {
    ...reducers,

    [ACTIONS.CLEAR_ERROR](state, action) {
      return state.removeIn(['value', action.payload]);
    },

    [ACTIONS.CLEAR_ERRORS]: getInitialState,
    [ACTIONS.MARK_ALL_ERRORS_AS_VIEWED](state) {
      return state.update('value', v => (
        v.map(e => e.set('viewed', true))
      ));
    },
  }
);
