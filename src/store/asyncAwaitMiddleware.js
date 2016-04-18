import { isFSA, isError } from 'flux-standard-action';

const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

function isAsyncAwait(value) {
  if (value && typeof value === 'object') {
    return value.asyncAwait &&
    typeof value.asyncAwait.then === 'function';
  }

  return false;
}

function isThunk(resolved) {
  return typeof resolved === 'function';
}

export default function asyncAwaitMiddlewareFactory({
  promiseTypeSuffixes = defaultTypes,
} = {}) {
  return function asyncAwaitMiddleware(store) {
    const { dispatch } = store;
    return next => async function actionner(action) {
      if (!isAsyncAwait(action.payload)) {
        return next(action);
      }

      let returnedAction = action;
      const { type, payload, meta } = action;
      const { asyncAwait, onResolve, onReject, data } = payload;
      const [PENDING, FULFILLED, REJECTED] = (meta || {}).promiseTypeSuffixes
      || promiseTypeSuffixes;

      const getResolveAction = error => ({
        type: `${type}_${error ? REJECTED : FULFILLED}`,
        ...!!meta ? { meta } : {},
        ...!!error ? { error: true } : {},
      });

      next({
        type: `${type}_${PENDING}`,
        ...!!data ? { payload: data } : {},
        ...!!meta ? { meta } : {},
      });

      try {
        const res = await asyncAwait;

        returnedAction = dispatch({
          ...getResolveAction(),
          ...(isFSA(res) ? res : {
            ...(!!res && { payload: res }),
          }),
        });

        if (isThunk(onResolve)) {
          await onResolve(res, store);
        }
      } catch (e) {
        returnedAction = dispatch({
          ...getResolveAction(true),
          ...(isError(e) ? e : {
            ...(!!e && { payload: e }),
          }),
        });

        if (isThunk(onReject)) {
          await onReject(e, store);
        }
      } finally {
        return returnedAction;
      }
    };
  };
}
