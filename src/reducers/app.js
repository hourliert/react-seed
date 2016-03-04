import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  TOGGLE_LEFTNAV,
  OPEN_LEFTNAV,
  CLOSE_LEFTNAV,
  SET_API,
  SET_APP_BAR_DEPTH,
} from 'constants/appActions';

function getInitialState() {
  return fromJS({
    leftNavOpen: false,
    initialRenderTime: undefined,
    appBarDepth: 1,
  });
}

export default handleActions({
  [TOGGLE_LEFTNAV](state) {
    return state.set('leftNavOpen', !state.get('leftNavOpen'));
  },

  [CLOSE_LEFTNAV](state) {
    return state.set('leftNavOpen', false);
  },

  [OPEN_LEFTNAV](state) {
    return state.set('leftNavOpen', true);
  },

  [SET_API](state, action) {
    const { apiName, Api } = action.payload;
    return state.set(apiName, Api);
  },

  [SET_APP_BAR_DEPTH](state, action) {
    return state.set('appBarDepth', action.payload);
  },
}, getInitialState());
