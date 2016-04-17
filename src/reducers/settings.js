import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  TOGGLE_SETTING,
} from 'constants/actions';

function getInitialState() {
  return fromJS({
    value: {
      defaultSetting: {
        id: 'defaultSetting',
        label: 'Random Setting',
        icon: 'label',
        value: true,
      },
    },
  });
}

export default reducerFactory(
  getInitialState(),
  {
    [TOGGLE_SETTING](state, action) {
      const { payload } = action;

      return state.updateIn(['value', payload.id, 'value'], v => !v);
    },
  }
);
