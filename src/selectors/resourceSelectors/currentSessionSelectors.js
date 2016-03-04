import { createSelector } from 'reselect';

export function currentSessionSelector(state) {
  return state.currentSession;
}

export const accessLevelSelector = createSelector(
  currentSessionSelector,
  session => session.getIn(['value', 'accessLevel']).toJS()
);

export const sessionSelector = createSelector(
  currentSessionSelector,
  session => session.get('value').toJS()
);
