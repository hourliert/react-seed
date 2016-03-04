import { is } from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export default createSelectorCreator(
  defaultMemoize,
  is
);
