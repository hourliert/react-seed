import { annotator, AbstractApi } from 'retax-components';

@annotator.Api({ // eslint-disable-line
  routes: {
    users: '/users',
  },
})
export default class UserApi extends AbstractApi {

  // User
  getCurrent() {
    return this.get({ url: `${this.routes.users}/me` });
  }

  updateUser(body) {
    return this.post({
      url: `${this.routes.users}`,
      body,
    });
  }
}
