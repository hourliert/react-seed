import { annotator, AbstractApi } from 'retax';

@annotator.Api({ // eslint-disable-line
  routes: {
    counter: '/counter',
  },
})
export default class CounterApi extends AbstractApi {
  getCounter() {
    return this.get({ url: `${this.routes.counter}` });
  }
}
