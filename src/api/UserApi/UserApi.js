import { annotator, AbstractApi } from 'retax-components';

@annotator.Api({ // eslint-disable-line
  routes: {
    users: '',
  },
})
export default class UserApi extends AbstractApi {
  getCurrent() {
    return this.get({ url: `${this.routes.users}/me` });
  }
}
