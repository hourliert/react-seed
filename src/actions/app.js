import { createAction } from 'redux-actions';
import warning from 'warning';

import * as Apis from 'api/apis';
import {
  TOGGLE_LEFTNAV,
  OPEN_LEFTNAV,
  CLOSE_LEFTNAV,
  SET_API,
  SET_APP_BAR_DEPTH,
} from 'constants/actions';

export const openLeftNav = createAction(OPEN_LEFTNAV);
export const closeLeftNav = createAction(CLOSE_LEFTNAV);
export const toggleLeftNav = createAction(TOGGLE_LEFTNAV);
export const setApi = createAction(SET_API);
export const setAppBarDepth = createAction(SET_APP_BAR_DEPTH);

export function initializeApis(apiConfig) {
  return (dispatch) => {
    const { baseUrl, token } = apiConfig;
    const apiNames = Object.keys(Apis);

    apiNames.forEach(apiName => {
      try {
        const Api = Apis[apiName];
        dispatch(setApi({
          apiName,
          Api: new Api({ baseUrl, token }),
        }));
      } catch (e) {
        warning(false, e.message);
      }
    });
  };
}
