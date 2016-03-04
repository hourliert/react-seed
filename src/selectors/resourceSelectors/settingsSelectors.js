import { createSelector } from 'reselect';

function settingsSelector(state) {
  return state.settings;
}

export const settingsListSelector = createSelector(
  settingsSelector,
  settings => settings.get('value').toList().toJS()
);
