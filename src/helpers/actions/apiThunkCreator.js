export function apiThunkCreator(apiName, actionCreator) {
  return function creator(opts) {
    return function thunk(dispatch, getState) {
      const { app } = getState();
      const api = app.get(apiName);

      return dispatch(actionCreator({ api, ...opts }, opts));
    };
  };
}
