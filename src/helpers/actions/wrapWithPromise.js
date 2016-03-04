async function executeCreator(dispatch, creator, creatorOptions) {
  await dispatch(creator(creatorOptions));
}

export function wrapWithPromise(ACTION, creator) {
  return function creatorWrapper(creatorOptions) {
    return async function thunk(dispatch) {
      return dispatch({
        type: ACTION.value,
        payload: {
          asyncAwait: executeCreator(dispatch, creator, creatorOptions),
        },
      });
    };
  };
}
