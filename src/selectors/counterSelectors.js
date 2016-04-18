import { createSelector } from 'reselect';

export function counterSelector(state) {
  return state.counter;
}

export const counterValueSelector = createSelector(
  counterSelector,
  counter => counter.get('value')
);
