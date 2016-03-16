import { createSelector } from 'reselect';

export function errorsSelector(state) {
  return state.errors;
}

export const errorsMapSelector = createSelector(
  errorsSelector,
  errors => errors.get('value').toJS()
);
