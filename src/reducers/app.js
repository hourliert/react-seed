import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  API_SERVER_HOSTNAME,
  API_SERVER_PORT,
} from 'config';

import {
  TOGGLE_LEFTNAV,
  OPEN_LEFTNAV,
  CLOSE_LEFTNAV,
  SET_API,
  SET_API_SERVER_HOSTNAME,
  SET_API_SERVER_PORT,
  SET_APP_BAR_DEPTH,
  SET_INITIAL_RENDER_TIME,
} from 'constants/actions';

function getInitialState() {
  return fromJS({
    API_SERVER_HOSTNAME,
    API_SERVER_PORT,
    leftNavOpen: false,
    initialRenderTime: undefined,
    appBarDepth: 1,
  });
}

export default reducerFactory(
  getInitialState(),
  {
    [SET_INITIAL_RENDER_TIME](state) {
      return state.update('initialRenderTime', time => {
        if (time) return time;
        return +new Date();
      });
    },

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

    [SET_API_SERVER_HOSTNAME](state, action) {
      const { apiServerHostname } = action.payload;
      return state.set('SET_API_SERVER_HOSTNAME', apiServerHostname);
    },

    [SET_API_SERVER_PORT](state, action) {
      const { apiServerPort } = action.payload;
      return state.set('SET_API_SERVER_PORT', apiServerPort);
    },

    [SET_APP_BAR_DEPTH](state, action) {
      return state.set('appBarDepth', action.payload);
    },
  }
);
