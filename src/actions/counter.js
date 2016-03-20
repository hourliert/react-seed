import { apiThunkCreator } from 'helpers/actions';
import { createAction } from 'redux-actions';

import {
  GET_COUNTER,
} from 'constants/actions/counter';

const _fetchCounter = createAction(
  GET_COUNTER.value,
  ({ api }) => ({ asyncAwait: api.getCounter() })
);

export const fetchCounter = apiThunkCreator('CounterApi', _fetchCounter);
