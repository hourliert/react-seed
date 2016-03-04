import { createSelector } from 'reselect';

export function currentUserSelector(state) {
  return state.currentUser;
}

export const userSelector = createSelector(
  currentUserSelector,
  user => user.get('value').toJS()
);
