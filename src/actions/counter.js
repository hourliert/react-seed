import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import CounterApi from 'api/CounterApi';
import {
  GET_COUNTER,
} from 'constants/actions';

@annotator.ActionsCreator({ // eslint-disable-line
  apis: {
    counterApi: CounterApi,
  },
})
export default class CounterActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  fetchCounter = actionsCreatorFactory(
    GET_COUNTER.value,
    () => ({ asyncAwait: this.apis.counterApi.getCounter() })
  );
}
